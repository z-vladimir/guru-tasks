import { useQuery } from '@tanstack/react-query';

import { TASKS_QUERY_KEY } from '../../const';
import { Task } from '../../model';
import { taskApi } from '../../api';

export const useTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: TASKS_QUERY_KEY,
    queryFn: () => taskApi.getAll(),
  });
};
