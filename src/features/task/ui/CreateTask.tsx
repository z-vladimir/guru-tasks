import { useState } from 'react';

import { useCreateTask } from '@/entities/task';
import { Button, Modal } from '@/shared/ui';
import { TaskForm } from './TaskForm';

export const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateTask();

  return (
    <div className="flex justify-end">
      <Button variant="primary" onClick={() => setOpen(true)}>
        Create Task
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Task">
        <TaskForm
          onSubmit={async (data) => {
            await mutateAsync(data);
            setOpen(false);
          }}
          isLoading={isPending}
          renderFooter={() => (
            <div className="flex justify-end gap-4">
              <Button type="submit" variant="primary" isLoading={isPending}>
                Create
              </Button>
            </div>
          )}
        />
      </Modal>
    </div>
  );
};
