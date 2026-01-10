import { CreateTaskRequest } from '../api';
import { Task } from '../model';

export const getStatusText = (status: Task['status']) =>
  status.replace('_', ' ');

export const normalizeTask = (task: CreateTaskRequest) => {
  return {
    ...task,
    name: task.name.trim(),
    key: task.key.trim(),
    description: task.description?.trim() ?? '',
  };
};
