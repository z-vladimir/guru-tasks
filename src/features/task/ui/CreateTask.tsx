import { useState } from 'react';

import {
  CreateTaskRequest,
  normalizeTask,
  useCreateTask,
} from '@/entities/task';
import { Button, Modal } from '@/shared/ui';
import { TaskForm } from './TaskForm';

export const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateTask();

  const handleCreate = async (task: CreateTaskRequest) => {
    const normalized = normalizeTask(task);
    mutate(normalized);

    setOpen(false);
  };

  return (
    <div className="flex justify-end">
      <Button variant="primary" onClick={() => setOpen(true)}>
        Create Task
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Task">
        <TaskForm
          onSubmit={handleCreate}
          renderActions={({ isValid }) => (
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={isPending}
                isDisabled={!isValid}
              >
                Create
              </Button>
            </div>
          )}
        />
      </Modal>
    </div>
  );
};
