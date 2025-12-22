import { Task } from '@/entities/task';

export interface GetTasksResponse extends Array<Task> {}

export interface CreateTaskRequest extends Omit<Task, 'id' | 'status'> {}
export interface CreateTaskResponse extends Task {}

export interface UpdateTaskRequest extends Partial<Omit<Task, 'id'>> {}
export interface UpdateTaskResponse extends Task {}

export interface DeleteTaskResponse extends Task {}
