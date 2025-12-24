import { useState } from 'react';
import { Task, TaskItem } from '@/entities/task';
import { EditTaskModal } from './EditTaskModal';

interface EditTaskProps {
  tasks: Task[];
}

export const EditTask = ({ tasks }: EditTaskProps) => {
  const [selected, setSelected] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
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
              onClick={() => {
                setSelected(task);
                setOpen(true);
              }}
            >
              <TaskItem task={task} />
            </li>
          ))
        )}
      </ul>
      {selected && (
        <EditTaskModal
          task={selected}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
