import { Prisma } from '@prisma/client';

import { HTTP_STATUS, ERROR_MESSAGES } from '@/shared/const';
import { prisma } from '@/shared/server';
import { parseLabels } from '../lib';
import { Task, TaskServiceError } from '../model';
import { CreateTaskRequest } from '../api';

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map((task) => ({
      ...task,
      labels: parseLabels(task.labels),
    }));
  },
  getById: async (id: string): Promise<Task | undefined> => {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) return undefined;

    return {
      ...task,
      labels: parseLabels(task.labels),
    };
  },
  create: async (task: CreateTaskRequest): Promise<Task | TaskServiceError> => {
    try {
      const newTask = await prisma.task.create({
        data: {
          name: task.name,
          key: task.key,
          description: task.description,
          labels: JSON.stringify(task.labels),
        },
      });

      return {
        ...newTask,
        labels: parseLabels(newTask.labels),
      };
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
      const updateData: Record<string, unknown> = { ...task };

      if (task.labels) {
        updateData.labels = JSON.stringify(task.labels);
      }

      const updatedTask = await prisma.task.update({
        where: { id },
        data: updateData,
      });

      return {
        ...updatedTask,
        labels: parseLabels(updatedTask.labels),
      };
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

      return {
        ...task,
        labels: parseLabels(task.labels),
      };
    } catch (error: unknown) {
      throw error;
    }
  },
};
