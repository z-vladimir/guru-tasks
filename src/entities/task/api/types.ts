import type { Task, TaskSchema } from '../model';

export interface GetTasksResponse extends Array<Task> {}

export type CreateTaskRequest = TaskSchema;
export interface CreateTaskResponse extends Task {}

export type UpdateTaskRequest = TaskSchema;
export interface UpdateTaskResponse extends Task {}

export interface DeleteTaskResponse extends Task {}
