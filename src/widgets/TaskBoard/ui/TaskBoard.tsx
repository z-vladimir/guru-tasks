'use client';

import { CrateTask, EditTask } from '@/features/task';
import { getStatusText, STATUSES, useTasks } from '@/entities/task';

export const TaskBoard = () => {
  const { data: tasks = [] } = useTasks();

  return (
    <section className="flex flex-col gap-6">
      <CrateTask />

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATUSES.map((status) => (
          <div
            key={status}
            className="bg-primary-200 rounded-xl py-5 px-4 min-h-[200px]"
          >
            <h2 className="font-bold text-lg capitalize mb-5 ml-3">
              {getStatusText(status)}
            </h2>

            <EditTask tasks={tasks.filter((task) => task.status === status)} />
          </div>
        ))}
      </div>
    </section>
  );
};
