import { Button } from './Button';
import { Modal } from './Modal';

interface ModalConfirmProps {
  title: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ModalConfirm = ({
  title,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: ModalConfirmProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-8">
        <p className="text-sm leading-md tracking-sm">
          This action is irreversible. After deleting, you will lose access to
          all settings, groups, modification history, and results of this task.
          The task cannot be restored. Are you sure you want to delete this
          task?
        </p>
        <div className="flex justify-end gap-4">
          <Button className="bg-transparent" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" isLoading={isLoading} onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
