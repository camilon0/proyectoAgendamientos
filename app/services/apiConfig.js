const API_BASE_URL =
  "https://lspz6suqyi.execute-api.us-east-1.amazonaws.com/dev";

export const API_ROUTES = {
  baseURL: API_BASE_URL,
  listActivities: "/activities",
  createActivity: "/activities",
  reservations: "/reservations",
  editActivity: (id) => `/activities/${id}`,
  deleteActivity: (id) => `/activities/${id}`,
};
