'use client';

import {
  TaskComponent,
  useCreateTask,
  useDeleteTask,
  useTasks,
} from '@/entities/task';
import { STATUSES } from '@/shared/const';

export const TaskBoard = () => {
  const { data: tasks = [] } = useTasks();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();

  const handleAddDemo = () => {
    createTask.mutate({
      key: `T-${Date.now()}`,
      name: 'New demo task',
      description: 'Demo',
      labels: [],
    });
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={handleAddDemo}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add demo task
        </button>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STATUSES.map((status) => (
          <div key={status} className="rounded-lg shadow p-4 min-h-[200px]">
            <h2 className="font-bold mb-4 text-lg capitalize">
              {status.replace('_', ' ')}
            </h2>
            <div className="flex flex-col gap-3">
              {tasks.filter((t) => t.status === status).length === 0 && (
                <div className="text-gray-400 text-sm">No tasks</div>
              )}
              {tasks
                .filter((t) => t.status === status)
                .map((task) => (
                  // <div
                  //   key={task.id}
                  //   className="bg-gray-100 rounded p-3 shadow-sm hover:bg-gray-200 transition cursor-pointer"
                  // >
                  //   <div className="font-semibold">{task.name}</div>
                  //   <div className="text-xs text-gray-500 mb-1">{task.key}</div>
                  //   <div className="text-xs text-gray-700 line-clamp-2 mb-1">
                  //     {task.description}
                  //   </div>
                  //   <div className="flex flex-wrap gap-1 mt-1">
                  //     {task.labels.map((label) => (
                  //       <span
                  //         key={label}
                  //         className="bg-blue-100 text-blue-700 text-xs rounded px-2 py-0.5"
                  //       >
                  //         {label}
                  //       </span>
                  //     ))}
                  //     <button
                  //       onClick={() => deleteTask.mutate(task.id)}
                  //       className="ml-auto text-red-600 text-xs underline"
                  //     >
                  //       Delete
                  //     </button>
                  //   </div>
                  // </div>
                  <TaskComponent key={task.id} task={task} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
