import { Task, useUpdateTask, useDeleteTask } from '@/entities/task';
import { Button, Modal } from '@/shared/ui';
import { TaskForm } from './TaskForm';

interface EditTaskModalProps {
  task: Task;
  open: boolean;
  onClose: () => void;
}

export const EditTaskModal = ({ task, open, onClose }: EditTaskModalProps) => {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleDelete = async () => {
    await deleteTask.mutateAsync(task.id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={`Edit: ${task.name}`}>
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
              onClick={handleDelete}
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
  );
};
