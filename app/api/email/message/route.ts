import { NextRequest, NextResponse } from 'next/server';
import { mailtmClient, oneSecMailClient } from '@/lib/mailtm';

export async function GET(request: NextRequest) {
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

      const message = await oneSecMailClient.getMessage(login, domain, messageId);
      return NextResponse.json({ message });
    }

    if (!token) {
      return NextResponse.json(
        { error: 'Missing token' },
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
