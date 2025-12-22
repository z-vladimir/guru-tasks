import { Task } from './types';
import { mockTasks } from './mockTasks';
import { HTTP_STATUS, ERROR_MESSAGES } from '@/shared/const';

let tasks: Task[] = [...mockTasks];

export const taskService = {
  getAll: (): Task[] => tasks,
  getById: (id: string): Task | undefined => tasks.find((t) => t.id === id),
  create: (
    data: Omit<Task, 'id' | 'status'>
  ): Task | { error: string; status?: number } => {
    if (tasks.some((t) => t.key === data.key)) {
      return {
        error: ERROR_MESSAGES.KEY_NOT_UNIQUE,
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      status: 'backlog',
    };
    tasks.unshift(newTask);
    return newTask;
  },
  update: (
    id: string,
    data: Partial<Task>
  ): Task | { error: string; status?: number } => {
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1)
      return {
        error: ERROR_MESSAGES.TASK_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND,
      };
    tasks[idx] = { ...tasks[idx], ...data };
    return tasks[idx];
  },
  delete: (id: string): Task | { error: string; status?: number } => {
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1)
      return {
        error: ERROR_MESSAGES.TASK_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND,
      };
    if (tasks[idx].status === 'in_progress') {
      return {
        error: ERROR_MESSAGES.CANNOT_DELETE_IN_PROGRESS,
        status: HTTP_STATUS.CONFLICT,
      };
    }
    const [deleted] = tasks.splice(idx, 1);
    return deleted;
  },
  reset: () => {
    tasks = [...mockTasks];
  },
};
