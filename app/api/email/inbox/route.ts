import { NextRequest, NextResponse } from 'next/server';
import { mailtmClient } from '@/lib/mailtm';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const messages = await mailtmClient.getMessages(token);

    return NextResponse.json({
      success: true,
      messages: messages || [],
    });
  } catch (error) {
    console.error('Fetch inbox error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch messages',
      },
      { status: 500 }
    );
  }
}
