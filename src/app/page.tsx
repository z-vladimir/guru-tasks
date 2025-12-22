import { TaskBoard } from '@/widgets/TaskBoard';
import { taskApi } from '@/entities/task';

export default async function Home() {
  const tasks = await taskApi.getAll();
  return (
    <div className="font-sans min-h-screen p-8 sm:p-20">
      <TaskBoard tasks={tasks} />
    </div>
  );
}
