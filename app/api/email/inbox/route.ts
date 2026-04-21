import { NextRequest, NextResponse } from 'next/server';
import { mailtmClient } from '@/lib/mailtm';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const messages = await mailtmClient.getMessages(token);
    return NextResponse.json({ messages: messages ?? [] });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch inbox';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
