import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { TaskBoard } from '@/widgets/TaskBoard';
import { TASKS_QUERY_KEY, taskService } from '@/entities/task';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: taskService.getAll,
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
