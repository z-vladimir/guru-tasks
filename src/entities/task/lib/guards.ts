import { Label } from '../model';
import { LABELS } from '../const';

export const isLabel = (value: unknown): value is Label => {
  return typeof value === 'string' && LABELS.includes(value as Label);
};