'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

import { taskApi } from '@/entities/task';
import type { Task } from '@/entities/task';
import type {
  CreateTaskRequest,
  CreateTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  DeleteTaskResponse,
} from '../api';
import { TASKS_QUERY_KEY } from '../const';

export const useTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: TASKS_QUERY_KEY,
    queryFn: () => taskApi.getAll(),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateTaskResponse, Error, CreateTaskRequest>({
    mutationFn: (task: CreateTaskRequest) => taskApi.create(task),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY as QueryKey }),
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateTaskResponse,
    Error,
    { id: string; task: UpdateTaskRequest }
  >({
    mutationFn: ({ id, task }: { id: string; task: UpdateTaskRequest }) =>
      taskApi.update(id, task),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY as QueryKey }),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteTaskResponse, Error, string>({
    mutationFn: (id: string) => taskApi.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY as QueryKey }),
  });
};
