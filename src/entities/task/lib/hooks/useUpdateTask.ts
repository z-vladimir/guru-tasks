import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getErrorMessage } from '@/shared/lib';
import { Task } from '../../model';
import { TASKS_QUERY_KEY } from '../../const';
import { taskApi, UpdateTaskRequest, UpdateTaskResponse } from '../../api';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateTaskResponse,
    Error,
    { id: string; task: UpdateTaskRequest }
  >({
    mutationFn: ({ id, task }: { id: string; task: UpdateTaskRequest }) =>
      taskApi.update(id, task),
    onMutate: async ({ id, task }): Promise<{ previousTasks: Task[] }> => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY });

      const previousTasks =
        queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY) || [];

      queryClient.setQueryData<Task[]>(
        TASKS_QUERY_KEY,
        previousTasks.map((previousTask) =>
          previousTask.id === id ? { ...previousTask, ...task } : previousTask
        )
      );

      return { previousTasks };
    },
    onError: (error, _vars, context) => {
      const ctx = context as { previousTasks?: Task[] } | undefined;

      queryClient.setQueryData<Task[]>(
        TASKS_QUERY_KEY,
        ctx?.previousTasks ?? []
      );

      addToast({
        title: 'Update error',
        description: getErrorMessage(error),
        color: 'danger',
      });
    },
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

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
};
