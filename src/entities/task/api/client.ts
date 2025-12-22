import { httpClient } from '@/shared/lib/httpClient';
import { TASK_API_ROUTES } from './routes';

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
    const res = await httpClient(TASK_API_ROUTES.TASKS, {
      cache: 'no-store',
    });

    return res.json();
  },
  async create(data: CreateTaskRequest): Promise<CreateTaskResponse> {
    const res = await httpClient(TASK_API_ROUTES.TASKS, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return res.json();
  },
  async update(
    id: string,
    data: UpdateTaskRequest
  ): Promise<UpdateTaskResponse> {
    const res = await httpClient(TASK_API_ROUTES.TASK(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    return res.json();
  },
  async delete(id: string): Promise<DeleteTaskResponse> {
    const res = await httpClient(TASK_API_ROUTES.TASK(id), {
      method: 'DELETE',
    });

    return res.json();
  },
};
