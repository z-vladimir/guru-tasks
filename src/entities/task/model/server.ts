import { createTaskService } from './taskService';
import { prismaTaskAdapter } from './prismaTaskAdapter';

export const taskService = createTaskService(prismaTaskAdapter);
