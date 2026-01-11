import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { TaskBoard } from '@/widgets/task';
import { TASKS_QUERY_KEY } from '@/entities/task';
import { taskService } from '@/entities/task/server';
import { getQueryClient } from '@/shared/lib';

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: () => taskService.getAll(),
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
