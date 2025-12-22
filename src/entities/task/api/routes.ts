export const TASK_API_ROUTES = {
  TASKS: '/api/tasks',
  TASK: (id: string) => `/api/tasks/${id}`,
} as const;
