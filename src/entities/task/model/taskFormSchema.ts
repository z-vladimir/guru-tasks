import { z } from 'zod';

import { LABELS, STATUSES } from '../const';

export const taskFormSchema = z.object({
  name: z.string().min(1, 'Task Name is required'),
  key: z.string().min(1, 'Task Key is required'),
  description: z.string().optional(),
  labels: z.array(z.enum(LABELS)).optional(),
  status: z.enum(STATUSES).optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
