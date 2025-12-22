import { Task } from '@/entities/task';
import { STATUSES } from '@/shared/const';

interface TaskBoardProps {
  tasks: Task[];
}

export const TaskBoard = ({ tasks }: TaskBoardProps) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
      {STATUSES.map((status) => (
        <div
          key={status}
          className="bg-white rounded-lg shadow p-4 min-h-[200px]"
        >
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
                <div
                  key={task.id}
                  className="bg-gray-100 rounded p-3 shadow-sm hover:bg-gray-200 transition cursor-pointer"
                >
                  <div className="font-semibold">{task.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{task.key}</div>
                  <div className="text-xs text-gray-700 line-clamp-2 mb-1">
                    {task.description}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {task.labels.map((label) => (
                      <span
                        key={label}
                        className="bg-blue-100 text-blue-700 text-xs rounded px-2 py-0.5"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
