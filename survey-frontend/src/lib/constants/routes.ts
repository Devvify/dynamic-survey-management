export const API_ROUTES = {
  ADMIN: {
    SURVEYS: {
      LIST: "/admin/surveys",
      CREATE: "/admin/surveys",
      DETAIL: (id: string | number) => `/admin/surveys/${id}`,
      SUBMISSIONS: (id: string | number) => `/admin/surveys/${id}/submissions`,
    },
    SUBMISSIONS: {
      DETAIL: (id: string | number) => `/admin/submissions/${id}`,
    },
  },

  OFFICER: {
    SURVEYS: {
      LIST: "/officer/surveys",
      DETAIL: (id: string | number) => `/officer/surveys/${id}`,
      SUBMISSION: (id: string | number) => `/officer/surveys/${id}/submission`,
      SUBMIT: (id: string | number) => `/officer/surveys/${id}/submit`,
    },
  },
};

// Frontend Page Routes
export const PAGE_ROUTES = {
  ADMIN: {
    DASHBOARD: "/admin",
    SURVEYS: {
      LIST: "/admin/surveys",
      CREATE: "/admin/surveys/create",
      DETAIL: (id: string | number) => `/admin/surveys/${id}`,
      SUBMISSIONS: (id: string | number) => `/admin/surveys/${id}/submissions`,
    },
    RESPONSES: "/admin/responses",
  },
  OFFICER: {
    SURVEYS: {
      LIST: "/surveys",
      DETAIL: (id: string | number) => `/surveys/${id}`,
    },
  },
  AUTH: {
    LOGIN: "/login",
  },
};
