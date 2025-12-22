import { HTTP_STATUS, ERROR_MESSAGES } from '@/shared/const';
import { Task, TaskServiceError } from './types';
import { mockTasks } from './mockTasks';

let tasks: Task[] = [...mockTasks];

export const taskService = {
  getAll: (): Task[] => tasks,
  getById: (id: string): Task | undefined =>
    tasks.find((task) => task.id === id),
  create: (task: Omit<Task, 'id' | 'status'>): Task | TaskServiceError => {
    const isKeyUnique = tasks.some((task) => task.key === task.key);

    if (!isKeyUnique) {
      return {
        error: ERROR_MESSAGES.KEY_NOT_UNIQUE,
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }

    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      status: 'backlog',
    };

    tasks = [newTask, ...tasks];

    return newTask;
  },
  update: (id: string, task: Partial<Task>): Task | TaskServiceError => {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1)
      return {
        error: ERROR_MESSAGES.TASK_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND,
      };

    tasks[index] = { ...tasks[index], ...task };

    return tasks[index];
  },
  delete: (id: string): Task | TaskServiceError => {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1)
      return {
        error: ERROR_MESSAGES.TASK_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND,
      };

    if (tasks[index].status === 'in_progress') {
      return {
        error: ERROR_MESSAGES.CANNOT_DELETE_IN_PROGRESS,
        status: HTTP_STATUS.CONFLICT,
      };
    }

    const [deleted] = tasks.splice(index, 1);

    return deleted;
  },
  reset: () => {
    tasks = [...mockTasks];
  },
};
