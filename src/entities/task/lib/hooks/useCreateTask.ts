'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';

import { Task, taskApi } from '@/entities/task';
import { getErrorMessage } from '@/shared/lib';
import type { CreateTaskRequest, CreateTaskResponse } from '../../api';
import { TASKS_QUERY_KEY } from '../../const';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateTaskResponse, Error, CreateTaskRequest>({
    mutationFn: (task: CreateTaskRequest) => taskApi.create(task),
    onMutate: async (newTask): Promise<{ previousTasks: Task[] }> => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY });

      const previousTasks =
        queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY) || [];

      const optimisticTask: Task = {
        id: crypto.randomUUID(),
        name: newTask.name,
        key: newTask.key,
        description: newTask.description ?? '',
        status: 'backlog',
        labels: newTask.labels ?? [],
      };

      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, [
        optimisticTask,
        ...previousTasks,
      ]);

      return { previousTasks };
    },
    onError: (error, _newTask, context) => {
      const ctx = context as { previousTasks?: Task[] } | undefined;

      queryClient.setQueryData<Task[]>(
        TASKS_QUERY_KEY,
        ctx?.previousTasks ?? []
      );

      addToast({
        title: 'Creation error',
        description: getErrorMessage(error),
        color: 'danger',
      });
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (oldTasks = []) => [
        createdTask,
        ...oldTasks.filter((task) => task.id !== createdTask.id),
      ]);

      addToast({
        title: 'Task has been created',
        description: `"${createdTask.name}" successfully created!`,
        color: 'success',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
};
