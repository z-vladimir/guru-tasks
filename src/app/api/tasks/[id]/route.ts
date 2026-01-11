import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { taskService } from '@/entities/task/server';
import { normalizeTask, taskSchema } from '@/entities/task';
import { HTTP_STATUS } from '@/shared/const';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const idParse = z.uuid().safeParse(id);

  if (!idParse.success) {
    return NextResponse.json(
      { error: idParse.error.message ?? 'Invalid id' },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  const task = await request.json();
  const parsed = taskSchema.safeParse(task);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.message ?? 'Invalid input' },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  const normalized = normalizeTask(parsed.data);

  const response = await taskService.update(id, normalized);

  if ('error' in response) {
    return NextResponse.json(
      { error: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(response, { status: HTTP_STATUS.OK });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const idParse = z.uuid().safeParse(id);

  if (!idParse.success) {
    return NextResponse.json(
      { error: idParse.error.message ?? 'Invalid id' },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  const response = await taskService.delete(id);

  if ('error' in response) {
    return NextResponse.json(
      { error: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(response, { status: HTTP_STATUS.OK });
}
