import { z } from 'zod';

import { LABELS, STATUSES } from '../const';

export const taskSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Task Name is required')
    .max(255, 'Task Name is too long'),
  key: z
    .string()
    .trim()
    .min(1, 'Task Key is required')
    .max(64, 'Task Key is too long'),
  description: z
    .string()
    .trim()
    .max(1000, 'Description is too long')
    .optional(),
  labels: z.array(z.enum(LABELS)).optional(),
  status: z.enum(STATUSES).optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
