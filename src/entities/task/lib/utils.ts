import { Task, Label } from '../model';
import { isLabel } from './guards';

export const getStatusText = (status: Task['status']) =>
  status.replace('_', ' ');

export const parseLabels = (labels: unknown): Label[] => {
  if (Array.isArray(labels) && labels.every(isLabel)) {
    return labels as Label[];
  }

  if (typeof labels === 'string') {
    try {
      const parsed = JSON.parse(labels);

      if (Array.isArray(parsed) && parsed.every(isLabel))
        return parsed as Label[];
    } catch {
      return [];
    }
  }
  return [];
};
