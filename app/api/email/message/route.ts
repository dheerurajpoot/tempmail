import { NextRequest, NextResponse } from 'next/server';
import { mailtmClient } from '@/lib/mailtm';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    const messageId = request.nextUrl.searchParams.get('id');

    if (!token || !messageId) {
      return NextResponse.json(
        { error: 'Missing token or message id' },
        { status: 400 }
      );
    }

    const message = await mailtmClient.getMessage(token, messageId);
    if (!message.isRead) {
      await mailtmClient.markAsRead(token, messageId);
    }

    return NextResponse.json({ message });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to read message';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
