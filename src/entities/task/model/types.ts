import { LABELS, STATUSES } from '../const';

export type Label = (typeof LABELS)[number];
export type Status = (typeof STATUSES)[number];

export interface Task {
  id: string;
  name: string;
  key: string;
  description: string | null;
  status: Status;
  labels: Label[];
}

export interface TaskServiceError {
  error: string;
  status?: number;
}
