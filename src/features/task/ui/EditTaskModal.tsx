import { useState } from 'react';

import { Task, useUpdateTask, useDeleteTask } from '@/entities/task';
import { Button, Modal } from '@/shared/ui';
import { ConfirmTaskModal } from './ConfirmTaskModal';
import { TaskForm } from './TaskForm';

interface EditTaskModalProps {
  task: Task;
  open: boolean;
  onClose: () => void;
}

export const EditTaskModal = ({ task, open, onClose }: EditTaskModalProps) => {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const closeConfirm = () => {
    setConfirmOpen(false);
  };

  const handleDelete = async () => {
    await deleteTask.mutateAsync(task.id);
    setConfirmOpen(false);
    onClose();
  };

  const showEdit = open && !confirmOpen;

  return (
    <>
      <Modal open={showEdit} onClose={onClose} title={`Edit: ${task.name}`}>
        <TaskForm
          isEdit
          defaultValues={task}
          onSubmit={async (data) => {
            await updateTask.mutateAsync({ id: task.id, task: data });
            onClose();
          }}
          renderFooter={({ isValid }) => (
            <div className="flex justify-end gap-4">
              <Button
                variant="danger"
                isLoading={deleteTask.isPending}
                onClick={() => {
                  setConfirmOpen(true);
                }}
              >
                Delete Task
              </Button>

              <Button
                type="submit"
                variant="primary"
                isLoading={updateTask.isPending}
                isDisabled={!isValid}
              >
                Update
              </Button>
            </div>
          )}
        />
      </Modal>

      <ConfirmTaskModal
        title={`Delete task “${task.name}”?`}
        isOpen={confirmOpen}
        isLoading={deleteTask.isPending}
        onClose={closeConfirm}
        onConfirm={handleDelete}
      />
    </>
  );
};
