import { NextRequest, NextResponse } from 'next/server';
import { mailtmClient, oneSecMailClient } from '@/lib/mailtm';

export async function DELETE(request: NextRequest) {
  try {
    const provider = request.nextUrl.searchParams.get('provider') || 'mailtm';
    const token = request.nextUrl.searchParams.get('token');
    const messageId = request.nextUrl.searchParams.get('id');
    const login = request.nextUrl.searchParams.get('login');
    const domain = request.nextUrl.searchParams.get('domain');

    if (!messageId) {
      return NextResponse.json({ error: 'Missing message id' }, { status: 400 });
    }

    if (provider === '1secmail') {
      if (!login || !domain) {
        return NextResponse.json(
          { error: 'Missing login or domain for secondary provider' },
          { status: 400 }
        );
      }

      await oneSecMailClient.deleteMessage(login, domain, messageId);
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
