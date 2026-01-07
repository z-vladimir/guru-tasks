import type { Task, TaskValues } from '../model';

export interface GetTasksResponse extends Array<Task> {}

export type CreateTaskRequest = TaskValues;
export interface CreateTaskResponse extends Task {}

export type UpdateTaskRequest = Partial<TaskValues>;
export interface UpdateTaskResponse extends Task {}

export interface DeleteTaskResponse extends Task {}
