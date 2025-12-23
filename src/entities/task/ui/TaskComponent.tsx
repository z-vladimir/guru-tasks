import { Divider } from '@heroui/divider';

import { Tag } from '@/shared/ui';
import { Task } from '../model';

interface TaskComponentProps {
  task: Task;
}

export const TaskComponent = ({ task }: TaskComponentProps) => {
  return (
    <article className="bg-primary-100 rounded-md p-4">
      <Tag color="success">{task.status}</Tag>
      <h4 className="text-md font-bold mt-3">{task.name}</h4>
      <p className="text-sm leading-md tracking-sm text-primary-600 mt-1">
        {task.key}
      </p>
      <p className="text-sm leading-md tracking-sm text-primary-700 mt-3">
        {task.description}
      </p>

      <Divider className="bg-primary-300 my-5" />

      <div className="flex flex-wrap gap-1">
        {task.labels?.map((label) => (
          <Tag
            key={label}
            color="secondary"
            className="font-semibold rounded-xs"
          >
            {label}
          </Tag>
        ))}
      </div>
    </article>
  );
};
