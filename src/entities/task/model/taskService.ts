import type { Task, TaskServiceError } from './types';
import type { CreateTaskRequest } from '../api';
import type { TaskRepository } from './taskRepository';

export const createTaskService = (repository: TaskRepository) => {
  return {
    getAll: async (): Promise<Task[]> => {
      return repository.getAll();
    },

    getById: async (id: string): Promise<Task | undefined> => {
      return repository.getById(id);
    },

    create: async (
      task: CreateTaskRequest
    ): Promise<Task | TaskServiceError> => {
      return repository.create(task);
    },

    update: async (
      id: string,
      task: Partial<Task>
    ): Promise<Task | TaskServiceError> => {
      return repository.update(id, task);
    },

    delete: async (id: string): Promise<Task | TaskServiceError> => {
      return repository.delete(id);
    },
  } as const;
};
