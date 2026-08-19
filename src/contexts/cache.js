import { create } from "zustand";
import { execute } from "../services/appwrite";
import { useEffect } from "react";

export const useCache = create((set, get) => ({
  cache: {},
  pending: {},
  friends: [],
  messages: {},
  channels: {},

  fetchUser: async (id, attempt = 0) => {
    const { pending } = get();

    if (pending[id]) return;

    set((state) => ({
      pending: {
        ...state.pending,
        [id]: true,
      },
    }));

    try {
      const res = await execute("interaction", "/user/get", { id });
      if (!res) return;

      if (res.success === false) {
        if (attempt < 8) {
          setTimeout(() => get().fetchUser(id, attempt + 1), 500);
          return;
        } else {
          console.error("Failed to fetch user after multiple attempts:", res);
          return;
        }
      }
      const now = Date.now();
      set((state) => ({
        cache: {
          ...state.cache,
          user: {
            ...(state.cache.user || {}),
            [id]: {
              data: res,
              lastUpdated: now,
            },
          },
        },
      }));
      if (
        get().friends.some((friend) => friend.target === id) ||
        res.relation === 3 ||
        res.relation === 2 ||
        res.relation === 1
      ) {
        get().getFriends();
      }
    } finally {
      set((state) => ({
        pending: {
          ...state.pending,
          [id]: false,
        },
      }));
    }
  },

  getFriends: async () => {
    const res = await execute("interaction", "/friend/get");
    if (!res) return;

    set((state) => ({
      friends: res,
    }));
  },

  getUser: (id) => {
    const user = get().cache.user?.[id];

    if (!user || Date.now() - user.lastUpdated > 60_000) {
      get().fetchUser(id);
    }

    return user?.data;
  },

  fetchChannel: async (id, attempt = 0) => {
    const { pending } = get();

    if (pending[`channel_${id}`]) return;

    try {
      const res = await execute("interaction", "/channel/get", { id });
    } catch (error) {}

    set((state) => ({
      pending: {
        ...state.pending,
        [`channel_${id}`]: true,
      },
    }));
  },
}));

// export const refreshFriends = async () => {
//   const { getFriends } = useCache.getState();
//   await getFriends();
// };

export const initiateCache = async () => {
  const { getFriends } = useCache.getState();
  await getFriends();
};

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
  }, [id, user?.lastUpdated]);
  return user?.data;
};

export const useFriends = (type = 3) => {
  const friends = useCache((state) => state.friends);
  return friends.filter((friend) => friend.type === type);
};

export const refreshUser = (id) => {
  const fetchUser = useCache.getState().fetchUser;
  fetchUser(id);
};

export const updateUserCache = (id, data) => {
  useCache.setState((state) => {
    const prev = state.cache.user?.[id];

    return {
      cache: {
        ...state.cache,
        user: {
          ...state.cache.user,
          [id]: {
            data: {
              ...(prev?.data || {}),
              ...data,
            },
            lastUpdated: Date.now(),
          },
        },
      },
    };
  });
};
