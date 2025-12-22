import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { TaskBoard } from '@/widgets/TaskBoard';
import { taskApi, TASKS_QUERY_KEY } from '@/entities/task';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: taskApi.getAll,
  });

  const dehydrated = dehydrate(queryClient);

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20">
      <HydrationBoundary state={dehydrated}>
        <TaskBoard />
      </HydrationBoundary>
    </div>
  );
}
