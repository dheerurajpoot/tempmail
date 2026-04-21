import { NextRequest, NextResponse } from 'next/server';
import { mailtmClient } from '@/lib/mailtm';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    const messageId = request.nextUrl.searchParams.get('id');

    if (!token || !messageId) {
      return NextResponse.json(
        { error: 'Token and message ID are required' },
        { status: 400 }
      );
    }

    const message = await mailtmClient.getMessage(token, messageId);

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error('Fetch message error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch message',
      },
      { status: 500 }
    );
  }
}
