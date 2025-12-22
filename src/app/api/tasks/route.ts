import { NextRequest, NextResponse } from 'next/server';

import { taskService } from '@/entities/task';
import { HTTP_STATUS } from '@/shared/const';

export async function GET() {
  return NextResponse.json(taskService.getAll(), { status: HTTP_STATUS.OK });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const response = taskService.create(data);

  if ('error' in response) {
    return NextResponse.json(
      { error: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(response, { status: HTTP_STATUS.CREATED });
}
