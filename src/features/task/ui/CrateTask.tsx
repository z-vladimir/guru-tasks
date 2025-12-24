import { useCreateTask } from '@/entities/task';
import { Button } from '@/shared/ui';

export const CrateTask = () => {
  const createTask = useCreateTask();

  const handleAddDemo = () => {
    createTask.mutate({
      key: `T-${Date.now()}`,
      name: 'New demo task',
      description: 'Demo',
      labels: [],
    });
  };

  return (
    <div className="flex justify-end">
      <Button variant="primary" onClick={handleAddDemo}>
        Create Task
      </Button>
    </div>
  );
};
