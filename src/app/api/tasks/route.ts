import { NextRequest, NextResponse } from 'next/server';

import { taskService } from '@/entities/task/server';
import { normalizeTask, taskSchema } from '@/entities/task';
import { HTTP_STATUS } from '@/shared/const';

export async function GET() {
  const tasks = await taskService.getAll();

  return NextResponse.json(tasks, { status: HTTP_STATUS.OK });
}

export async function POST(request: NextRequest) {
  const task = await request.json();
  const parsed = taskSchema.safeParse(task);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.message ?? 'Invalid input' },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  const normalized = normalizeTask(parsed.data);

  const response = await taskService.create(normalized);

  if ('error' in response) {
    return NextResponse.json(
      { error: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(response, { status: HTTP_STATUS.CREATED });
}
