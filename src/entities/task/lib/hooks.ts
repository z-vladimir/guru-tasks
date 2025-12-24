'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';

import { taskApi } from '@/entities/task';
import { getErrorMessage } from '@/shared/lib';
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
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (oldTasks = []) => [
        task,
        ...oldTasks,
      ]);
      addToast({
        title: 'Task has been created',
        description: `"${task.name}" successfully created!`,
        color: 'success',
      });
    },
    onError: (error) => {
      addToast({
        title: 'Creation error',
        description: getErrorMessage(error),
        color: 'danger',
      });
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
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (oldTasks = []) =>
        oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      addToast({
        title: 'Task has been updated',
        description: `"${updatedTask.name}" successfully updated!`,
        color: 'success',
      });
    },
    onError: (error) => {
      addToast({
        title: 'Update error',
        description: getErrorMessage(error),
        color: 'danger',
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteTaskResponse, Error, string>({
    mutationFn: (id: string) => taskApi.delete(id),
    onSuccess: (deletedTask) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (oldTasks = []) =>
        oldTasks.filter((task) => task.id !== deletedTask.id)
      );
      addToast({
        title: 'Task has been deleted',
        description: `"${deletedTask.name}" successfully deleted!`,
        color: 'success',
      });
    },
    onError: (error) => {
      addToast({
        title: 'Delete error',
        description: getErrorMessage(error),
        color: 'danger',
      });
    },
  });
};
