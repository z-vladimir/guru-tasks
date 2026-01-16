import { createTaskService } from './taskService';
import { prismaTaskRepository } from './prismaTaskRepository';

export const taskService = createTaskService(prismaTaskRepository);
