import { NextRequest, NextResponse } from 'next/server';

import { taskService } from '@/entities/task';

export async function GET() {
  return NextResponse.json(taskService.getAll());
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const response = taskService.create(data);

  if ('error' in response) {
    return NextResponse.json({ error: response.error }, { status: 400 });
  }

  return NextResponse.json(response, { status: 201 });
}
