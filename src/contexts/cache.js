import { create } from "zustand";
import { execute, tablesDB } from "../services/appwrite";
import { useEffect } from "react";

const getMessageIdentity = (item) => {
  if (!item) return [];

  return [item.$id, item.int_id].filter(Boolean);
};

const matchesMessageIdentity = (left, right) => {
  if (!left || !right) return false;

  const leftIds = getMessageIdentity(left);
  const rightIds = getMessageIdentity(right);

  if (!leftIds.length || !rightIds.length) return false;

  return leftIds.some((id) => rightIds.includes(id));
};

const upsertMessage = (list, incoming) => {
  if (!incoming) return list;

  // Find ALL matching indices in the existing list
  const matchingIndices = [];
  list.forEach((entry, idx) => {
    if (matchesMessageIdentity(entry, incoming)) {
      matchingIndices.push(idx);
    }
  });

  if (matchingIndices.length === 0) {
    return [...list, incoming];
  }

  // Combine data from all existing matching records with the incoming record
  const mergedItem = matchingIndices.reduce(
    (acc, idx) => ({ ...acc, ...list[idx] }),
    { ...incoming }
  );

  // Keep items that didn't match, and insert mergedItem at the first matched index
  const firstMatchIndex = matchingIndices[0];
  const matchingSet = new Set(matchingIndices);

  return list.reduce((acc, entry, idx) => {
    if (idx === firstMatchIndex) {
      acc.push(mergedItem);
    } else if (!matchingSet.has(idx)) {
      acc.push(entry);
    }
    return acc;
  }, []);
};

export const useCache = create((set, get) => ({
  cache: {
    user: {},
    channels: {},
  },
  pending: {},
  friends: [],
  messages: {},

  fetchUser: async (id, attempt = 0) => {
    if (!id || get().pending[`user_${id}`]) return;

    set((state) => ({
      pending: { ...state.pending, [`user_${id}`]: true },
    }));

    try {
      const res = await execute("interaction", "/user/get", { id });

      if (!res) {
        set((state) => ({
          cache: {
            ...state.cache,
            user: {
              ...state.cache.user,
              [id]: {
                data: state.cache.user?.[id]?.data ?? null,
                lastUpdated: Date.now(),
                error: "No user payload returned",
              },
            },
          },
        }));

        if (attempt < 8) {
          setTimeout(() => get().fetchUser(id, attempt + 1), 500);
        }
        return;
      }

      if (res.success === false) {
        set((state) => ({
          cache: {
            ...state.cache,
            user: {
              ...state.cache.user,
              [id]: {
                data: state.cache.user?.[id]?.data ?? null,
                lastUpdated: Date.now(),
                error: res.message || "User fetch failed",
              },
            },
          },
        }));

        if (attempt < 8) {
          setTimeout(() => get().fetchUser(id, attempt + 1), 500);
        } else {
          console.error("Failed to fetch user after multiple attempts:", res);
        }
        return;
      }

      set((state) => ({
        cache: {
          ...state.cache,
          user: {
            ...state.cache.user,
            [id]: { data: res, lastUpdated: Date.now(), error: null },
          },
        },
      }));

      const isFriend = get().friends.some((f) => f.target === id);
      if (isFriend || [1, 2, 3].includes(res.relation)) {
        get().getFriends();
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set((state) => ({
        cache: {
          ...state.cache,
          user: {
            ...state.cache.user,
            [id]: {
              data: state.cache.user?.[id]?.data ?? null,
              lastUpdated: Date.now(),
              error: error?.message || "User fetch threw an error",
            },
          },
        },
      }));

      if (attempt < 8) {
        setTimeout(() => get().fetchUser(id, attempt + 1), 500);
      }
    } finally {
      set((state) => ({
        pending: { ...state.pending, [`user_${id}`]: false },
      }));
    }
  },

  getFriends: async () => {
    const res = await execute("interaction", "/friend/get");
    if (res) set({ friends: res });
  },

  getMessages: async (dm, parent = null, offset = 0) => {
    const res = await execute("interaction", "/message/get", {
      dm_parent: dm || null,
      parent: parent || null,
      offset,
    });
    if (!res) return;

    set((state) => {
      const existing = state.messages?.[dm]?.data ?? [];
      const normalized = Array.isArray(res) ? res : [];
      const deduped = normalized.reduce((acc, item) => upsertMessage(acc, item), existing);

      const nextMessages = offset === 0
        ? deduped.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0))
        : deduped.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));

      return {
        messages: {
          ...state.messages,
          [dm]: {
            data: nextMessages,
            lastUpdated: Date.now(),
          },
        },
      };
    });
  },

  getUser: (id) => get().cache.user?.[id]?.data,

  fetchDMChannel: async (id, attempt = 0) => {
    if (get().pending[`dm_${id}`]) return;

    set((state) => ({
      pending: { ...state.pending, [`dm_${id}`]: true },
    }));

    try {
      const res = await execute("interaction", "/dm/get", { user: id });
      if (!res || res.success === false) return;

      set((state) => ({
        cache: {
          ...state.cache,
          channels: {
            ...state.cache.channels,
            [res.$id]: { data: res, lastUpdated: Date.now() },
          },
        },
      }));
    } finally {
      set((state) => ({
        pending: { ...state.pending, [`dm_${id}`]: false },
      }));
    }
  },

  fetchChannel: async (id) => {
    if (get().pending[`channel_${id}`]) return;

    set((state) => ({
      pending: { ...state.pending, [`channel_${id}`]: true },
    }));

    try {
      await execute("interaction", "/channel/get", { id });
    } catch (error) {
      console.error("Failed to fetch channel:", error);
    } finally {
      set((state) => ({
        pending: { ...state.pending, [`channel_${id}`]: false },
      }));
    }
  },
}));

// --- Helper Actions ---
export const initiateCache = () => useCache.getState().getFriends();
export const refreshUser = (id) => useCache.getState().fetchUser(id);
export const initDMChannel = (id) => useCache.getState().fetchDMChannel(id);
export const getUserFromCache = (id) => useCache.getState().getUser(id);
export const getDMChannelFromCache = (id) => useCache.getState().cache.channels?.[id]?.data;

export const updateUserCache = (id, data) => {
  useCache.setState((state) => {
    const prev = state.cache.user?.[id];
    return {
      cache: {
        ...state.cache,
        user: {
          ...state.cache.user,
          [id]: {
            data: { ...(prev?.data || {}), ...data },
            lastUpdated: Date.now(),
          },
        },
      },
    };
  });
};

export const addMessageToCache = (dm, message) => {
  useCache.setState((state) => {
    if (!dm || !message) return state;

    const prev = state.messages?.[dm]?.data ?? [];
    const dedupedMessages = upsertMessage(prev, message);
    return {
      messages: {
        ...state.messages,
        [dm]: {
          data: dedupedMessages.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0)),
          lastUpdated: Date.now(),
        },
      },
    };
  });
};

export const fetchMoreMessages = (id) => {
  const messages = useCache.getState().messages?.[id];
  if (!messages || !Array.isArray(messages.data)) return;

  const offset = messages.data.length;
  useCache.getState().getMessages(id, null, offset);
};

// --- Custom Hooks ---
export const useMessages = (id) => {
  const messages = useCache((state) => state.messages?.[id] ?? null);
  const getMessages = useCache((state) => state.getMessages);

  useEffect(() => {
    if (!id) return;

    const isStale =
      !messages?.data ||
      !messages?.lastUpdated ||
      Date.now() - messages.lastUpdated > 60_000;

    if (isStale) {
      getMessages(id);
    }
  }, [id, messages?.lastUpdated, getMessages]);

  return messages?.data ?? [];
};

export const useDMChannel = (id) => {
  const channel = useCache((state) => state.cache.channels?.[id] ?? null);
  const fetchDMChannel = useCache((state) => state.fetchDMChannel);

  useEffect(() => {
    if (!id) return;

    const isStale =
      !channel?.data ||
      !channel?.lastUpdated ||
      Date.now() - channel.lastUpdated > 60_000;

    if (isStale) {
      fetchDMChannel(id);
    }
  }, [id, channel?.lastUpdated, fetchDMChannel]);

  return channel?.data ?? null;
}
export const useUser = (id, force = false) => {
  if (!id) {
    return null;
  }
  const user = useCache((state) => state.cache.user?.[id] ?? null);
  const fetchUser = useCache((state) => state.fetchUser);
  const isPending = useCache((state) => !!state.pending[`user_${id}`]);

  useEffect(() => {
    if (!id) return;

    const isStale =
      !user?.data ||
      !user?.lastUpdated ||
      Date.now() - user.lastUpdated > 60_000;

    if ((isStale && !isPending) || force) {
      fetchUser(id);
    }
  }, [id, user?.data?._id, user?.lastUpdated, force, fetchUser, isPending]);

  return user?.data ?? null;
};

export const useFriends = (type = 3) => {
  const friends = useCache((state) => state.friends);
  return friends.filter((friend) => friend.type === type);
};