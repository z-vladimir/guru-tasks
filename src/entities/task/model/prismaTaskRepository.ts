import { Prisma } from '@prisma/client';

import { HTTP_STATUS, ERROR_MESSAGES } from '@/shared/const';
import { prisma } from '@/shared/lib/server';
import type { Task, TaskServiceError } from './types';
import type { CreateTaskRequest } from '../api';
import type { TaskRepository } from './taskRepository';

export const prismaTaskRepository: TaskRepository = {
  getAll: async (): Promise<Task[]> => {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return tasks;
  },

  getById: async (id: string): Promise<Task | undefined> => {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) return undefined;

    return task;
  },

  create: async (task: CreateTaskRequest): Promise<Task | TaskServiceError> => {
    try {
      const newTask = await prisma.task.create({
        data: task,
      });

      return newTask;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return {
            error: ERROR_MESSAGES.KEY_NOT_UNIQUE,
            status: HTTP_STATUS.BAD_REQUEST,
          };
        }
      }

      throw error;
    }
  },

  update: async (
    id: string,
    task: Partial<Task>
  ): Promise<Task | TaskServiceError> => {
    try {
      const updatedTask = await prisma.task.update({
        where: { id },
        data: task,
      });

      return updatedTask;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return {
            error: ERROR_MESSAGES.TASK_NOT_FOUND,
            status: HTTP_STATUS.NOT_FOUND,
          };
        }
      }

      throw error;
    }
  },

  delete: async (id: string): Promise<Task | TaskServiceError> => {
    try {
      const task = await prisma.task.findUnique({ where: { id } });

      if (!task) {
        return {
          error: ERROR_MESSAGES.TASK_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND,
        };
      }

      if (task.status === 'in_progress') {
        return {
          error: ERROR_MESSAGES.CANNOT_DELETE_IN_PROGRESS,
          status: HTTP_STATUS.CONFLICT,
        };
      }

      await prisma.task.delete({ where: { id } });

      return task;
    } catch (error: unknown) {
      throw error;
    }
  },
};

export default prismaTaskRepository;
