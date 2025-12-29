import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { TaskBoard } from '@/widgets/TaskBoard';
import { TASKS_QUERY_KEY, taskService } from '@/entities/task';
import { getQueryClient } from '@/shared/lib';

export default async function Home() {
  const queryClient = getQueryClient();

  taskService.reset();

  await queryClient.prefetchQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: taskService.getAll,
  });

  const dehydrated = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrated}>
      <main className="min-h-screen max-w-[1164px] mx-auto py-8 px-5 xl:px-0 xl:py-20 ">
        <TaskBoard />
      </main>
    </HydrationBoundary>
  );
}
