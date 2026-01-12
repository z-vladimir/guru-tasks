'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';

import { getErrorMessage } from '@/shared/lib';
import {
  taskApi,
  type CreateTaskRequest,
  type CreateTaskResponse,
} from '../../api';
import { TASKS_QUERY_KEY } from '../../const';
import { Task } from '../../model';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateTaskResponse, Error, CreateTaskRequest>({
    mutationFn: (task: CreateTaskRequest) => taskApi.create(task),
    onMutate: async (newTask): Promise<{ previousTasks: Task[]; optimisticId: string }> => {
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

      return { previousTasks, optimisticId: optimisticTask.id };
    },
    onError: (error, _newTask, context) => {
      const ctx = context as { previousTasks?: Task[] } | undefined;

      queryClient.setQueryData<Task[]>(
        TASKS_QUERY_KEY,
        ctx?.previousTasks ?? []
      );

      // If optimistic update failed, refresh from server to guarantee consistency
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });

      addToast({
        title: 'Creation error',
        description: getErrorMessage(error),
        color: 'danger',
      });
    },
    onSuccess: (createdTask, _vars, context) => {
      const ctx = context as { optimisticId?: string } | undefined;

      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (oldTasks = []) =>
        oldTasks.map((task) => (task.id === ctx?.optimisticId ? createdTask : task))
      );

      addToast({
        title: 'Task has been created',
        description: `"${createdTask.name}" successfully created!`,
        color: 'success',
      });
    },
    // NOTE: we avoid invalidating onSettled to reduce immediate refetches.
    // Server state is applied in onSuccess; onError we invalidate to recover.
  });
};
