import { NextRequest, NextResponse } from 'next/server';

import { taskService } from '@/entities/task/server';
import { taskSchema } from '@/entities/task';
import { HTTP_STATUS } from '@/shared/const';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const task = await request.json();
  const parsed = taskSchema.partial().safeParse(task);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.message ?? 'Invalid input' },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  const response = await taskService.update(id, parsed.data);

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

  const response = await taskService.delete(id);

  if ('error' in response) {
    return NextResponse.json(
      { error: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(response, { status: HTTP_STATUS.OK });
}
