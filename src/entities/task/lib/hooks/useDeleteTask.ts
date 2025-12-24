import { addToast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getErrorMessage } from '@/shared/lib';
import { Task } from '../../model';
import { TASKS_QUERY_KEY } from '../../const';
import { DeleteTaskResponse, taskApi } from '../../api';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteTaskResponse, Error, string>({
    mutationFn: (id: string) => taskApi.delete(id),
    onMutate: async (id): Promise<{ previousTasks: Task[] }> => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY });

      const previousTasks =
        queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY) || [];

      queryClient.setQueryData<Task[]>(
        TASKS_QUERY_KEY,
        previousTasks.filter((previousTask) => previousTask.id !== id)
      );

      return { previousTasks };
    },
    onError: (error, _id, context) => {
      const ctx = context as { previousTasks?: Task[] } | undefined;

      queryClient.setQueryData<Task[]>(
        TASKS_QUERY_KEY,
        ctx?.previousTasks ?? []
      );

      addToast({
        title: 'Delete error',
        description: getErrorMessage(error),
        color: 'danger',
      });
    },
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
};
