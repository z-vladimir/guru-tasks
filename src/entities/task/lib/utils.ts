import { Task } from '../model';

export const getStatusText = (status: Task['status']) =>
  status.replace('_', ' ');
