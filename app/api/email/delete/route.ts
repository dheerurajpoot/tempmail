import { NextRequest, NextResponse } from 'next/server';
import { mailtmClient } from '@/lib/mailtm';

export async function DELETE(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    const messageId = request.nextUrl.searchParams.get('id');

    if (!token || !messageId) {
      return NextResponse.json(
        { error: 'Missing token or message id' },
        { status: 400 }
      );
    }

    await mailtmClient.deleteMessage(token, messageId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete message';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
