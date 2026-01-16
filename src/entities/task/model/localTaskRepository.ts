import { HTTP_STATUS, ERROR_MESSAGES } from '@/shared/const';
import { Task, TaskServiceError } from './types';
import { mockTasks } from './mockTasks';
import { TaskRepository } from './taskRepository';

let tasks: Task[] = [...mockTasks];

export const localTaskRepository: TaskRepository = {
  getAll: async (): Promise<Task[]> => tasks,

  getById: async (id: string): Promise<Task | undefined> =>
    tasks.find((task) => task.id === id),

  create: async (
    task: Omit<Task, 'id' | 'status'>
  ): Promise<Task | TaskServiceError> => {
    const isDuplicateKey = tasks.some(
      (storedTask) => storedTask.key === task.key
    );

    if (isDuplicateKey) {
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

  update: async (
    id: string,
    task: Partial<Task>
  ): Promise<Task | TaskServiceError> => {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1)
      return {
        error: ERROR_MESSAGES.TASK_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND,
      };

    tasks[index] = { ...tasks[index], ...task };

    return tasks[index];
  },

  delete: async (id: string): Promise<Task | TaskServiceError> => {
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
};
