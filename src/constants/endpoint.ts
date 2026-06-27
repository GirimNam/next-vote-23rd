export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    REISSUE: "/auth/reissue",
    LOGOUT: "/auth/logout",
  },

  CANDIDATES: "/candidates",

  VOTES: {
    PART_LEADER: "/votes/part-leader",
    PART_LEADER_CANDIDATES: "/votes/part-leader/candidates",
    PART_LEADER_RESULT: "/votes/part-leader/result",
    DEMO_DAY: "/votes/demo-day",
    DEMO_DAY_CANDIDATES: "/votes/demo-day/candidates",
    DEMO_DAY_RESULT: "/votes/demo-day/result",
  },
} as const;
