import { Task, TaskItem } from '@/entities/task';

interface EditTaskProps {
  tasks: Task[];
}

export const EditTask = ({ tasks }: EditTaskProps) => {
  return (
    <ul className="flex flex-col gap-5">
      {tasks.length === 0 ? (
        <li>
          <p className="text-primary-600 text-sm">No tasks</p>
        </li>
      ) : (
        tasks.map((task) => (
          <li
            key={task.id}
            className="rounded-md hover:shadow-md transition cursor-pointer"
          >
            <TaskItem task={task} />
          </li>
        ))
      )}
    </ul>
  );
};
