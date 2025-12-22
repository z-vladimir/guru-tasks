'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
    onSuccess: (task) => {
      // queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY as QueryKey }),
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (oldTasks = []) => [
        task,
        ...oldTasks,
      ]);
    },
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
    onSuccess: (updatedTask) => {
      // queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY as QueryKey }),
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (oldTasks = []) =>
        oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteTaskResponse, Error, string>({
    mutationFn: (id: string) => taskApi.delete(id),
    onSuccess: (deletedTask) => {
      // queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY as QueryKey }),
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (oldTasks = []) =>
        oldTasks.filter((task) => task.id !== deletedTask.id)
      );
    },
  });
};
