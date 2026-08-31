import { create } from "zustand";
import { execute, tablesDB } from "../services/appwrite";
import { useEffect } from "react";

export const useCache = create((set, get) => ({
  cache: {
    user: {},
    channels: {},
  },
  pending: {},
  friends: [],
  messages: {},

  fetchUser: async (id, attempt = 0) => {
    if (get().pending[`user_${id}`]) return;

    set((state) => ({
      pending: { ...state.pending, [`user_${id}`]: true },
    }));

    try {
      const res = await execute("interaction", "/user/get", { id });
      if (!res) return;

      if (res.success === false) {
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
            [id]: { data: res, lastUpdated: Date.now() },
          },
        },
      }));

      const isFriend = get().friends.some((f) => f.target === id);
      if (isFriend || [1, 2, 3].includes(res.relation)) {
        get().getFriends();
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

  set((state) => ({
    messages: {
      ...state.messages,
      [dm]: {
        data: res,
        lastUpdated: Date.now(),
      },
    },
  }));
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
    const prev = state.messages?.[dm];
    const updatedMessages = prev?.data ? [...prev.data, message] : [message];
    return {
      messages: {
        ...state.messages,
        [dm]: {
          data: updatedMessages,
          lastUpdated: Date.now(),
        },
      },
    };
  });
};

// --- Custom Hooks ---

// REMOVED 'async' keyword here
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
  const user = useCache((state) => state.cache.user?.[id] ?? null);
  const fetchUser = useCache((state) => state.fetchUser);

  useEffect(() => {
    if (!id) return;
    const isStale =
      !user?.data ||
      !user?.lastUpdated ||
      Date.now() - user.lastUpdated > 60_000;

    if (isStale || force) {
      fetchUser(id);
    }
  }, [id, user?.lastUpdated, force, fetchUser]);

  return user?.data;
};

export const useFriends = (type = 3) => {
  const friends = useCache((state) => state.friends);
  return friends.filter((friend) => friend.type === type);
};