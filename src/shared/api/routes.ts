export const API_ROUTES = {
  TASKS: '/api/tasks',
  TASK: (id: string) => `/api/tasks/${id}`,
} as const;
