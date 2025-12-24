import { Task } from '@/entities/task';
import type { TaskFormValues } from '../model/taskFormSchema';

export interface GetTasksResponse extends Array<Task> {}

export type CreateTaskRequest = TaskFormValues;
export interface CreateTaskResponse extends Task {}

export type UpdateTaskRequest = Partial<TaskFormValues>;
export interface UpdateTaskResponse extends Task {}

export interface DeleteTaskResponse extends Task {}
