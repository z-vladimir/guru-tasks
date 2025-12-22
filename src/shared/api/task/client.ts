import { API_ROUTES } from '../routes';
import type {
  GetTasksResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  DeleteTaskResponse,
} from './types';

export const taskApi = {
  async getAll(): Promise<GetTasksResponse> {
    const res = await fetch(API_ROUTES.TASKS, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },
  async create(data: CreateTaskRequest): Promise<CreateTaskResponse> {
    const res = await fetch(API_ROUTES.TASKS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },
  async update(
    id: string,
    data: UpdateTaskRequest
  ): Promise<UpdateTaskResponse> {
    const res = await fetch(API_ROUTES.TASK(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  },
  async delete(id: string): Promise<DeleteTaskResponse> {
    const res = await fetch(API_ROUTES.TASK(id), {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return res.json();
  },
};
