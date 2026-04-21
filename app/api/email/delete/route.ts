import { NextRequest, NextResponse } from 'next/server';
import { guerrillaMailClient, mailtmClient } from '@/lib/mailtm';

export async function DELETE(request: NextRequest) {
  try {
    const provider = request.nextUrl.searchParams.get('provider') || 'mailtm';
    const token = request.nextUrl.searchParams.get('token');
    const messageId = request.nextUrl.searchParams.get('id');

    if (!messageId) {
      return NextResponse.json({ error: 'Missing message id' }, { status: 400 });
    }

    if (provider === 'guerrillamail') {
      if (!token) {
        return NextResponse.json(
          { error: 'Missing token for secondary provider' },
          { status: 400 }
        );
      }

      await guerrillaMailClient.deleteMessage(token, messageId);
      return NextResponse.json({ success: true });
    }

    if (!token) {
      return NextResponse.json(
        { error: 'Missing token' },
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
