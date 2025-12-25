import { LABELS, STATUSES } from '../const';

type Label = (typeof LABELS)[number];
type Status = (typeof STATUSES)[number];

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
