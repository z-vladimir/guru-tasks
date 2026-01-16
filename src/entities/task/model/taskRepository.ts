import type { Task, TaskServiceError } from './types';
import type { CreateTaskRequest } from '../api';

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | undefined>;
  create(task: CreateTaskRequest): Promise<Task | TaskServiceError>;
  update(id: string, task: Partial<Task>): Promise<Task | TaskServiceError>;
  delete(id: string): Promise<Task | TaskServiceError>;
}
