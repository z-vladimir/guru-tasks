import { NextRequest, NextResponse } from 'next/server';
import { taskService } from '@/entities/task';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();

  const response = taskService.update(id, data);

  if ('error' in response) {
    return NextResponse.json({ error: response.error }, { status: 404 });
  }

  return NextResponse.json(response);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const response = taskService.delete(id);

  if ('error' in response) {
    return NextResponse.json(
      { error: response.error },
      { status: response.status ?? 400 }
    );
  }

  return NextResponse.json(response);
}
