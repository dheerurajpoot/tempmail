import { NextRequest, NextResponse } from 'next/server';
import { mailtmClient } from '@/lib/mailtm';

export async function DELETE(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    const messageId = request.nextUrl.searchParams.get('id');

    if (!token || !messageId) {
      return NextResponse.json(
        { error: 'Token and message ID are required' },
        { status: 400 }
      );
    }

    await mailtmClient.deleteMessage(token, messageId);

    return NextResponse.json({
      success: true,
      message: 'Message deleted',
    });
  } catch (error) {
    console.error('Delete message error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to delete message',
      },
      { status: 500 }
    );
  }
}
