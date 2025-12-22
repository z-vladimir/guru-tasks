import { NextRequest, NextResponse } from 'next/server';
import { taskService } from '@/entities/task';

export async function GET() {
  return NextResponse.json(taskService.getAll());
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const result = taskService.create(data);

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result, { status: 201 });
}
