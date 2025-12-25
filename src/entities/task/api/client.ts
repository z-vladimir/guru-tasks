import { httpClient } from '@/shared/lib';
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
    const response = await httpClient(TASK_API_ROUTES.TASKS, {
      cache: 'no-store',
    });

    return response.json();
  },
  async create(data: CreateTaskRequest): Promise<CreateTaskResponse> {
    const response = await httpClient(TASK_API_ROUTES.TASKS, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return response.json();
  },
  async update(
    id: string,
    data: UpdateTaskRequest
  ): Promise<UpdateTaskResponse> {
    const response = await httpClient(TASK_API_ROUTES.TASK(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    return response.json();
  },
  async delete(id: string): Promise<DeleteTaskResponse> {
    const response = await httpClient(TASK_API_ROUTES.TASK(id), {
      method: 'DELETE',
    });

    return response.json();
  },
};
