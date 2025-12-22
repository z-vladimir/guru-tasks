import { Status, Label } from '@/shared/const';

export interface Task {
  id: string;
  name: string;
  key: string;
  description: string;
  status: Status;
  labels: Label[];
}

export interface TaskServiceError {
  error: string;
  status?: number;
}
