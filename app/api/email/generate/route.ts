import { NextRequest, NextResponse } from 'next/server';
import { mailtmClient } from '@/lib/mailtm';

export async function POST(request: NextRequest) {
  try {
    // Get available domains
    const domains = await mailtmClient.getDomains();


    if (!domains || domains.length === 0) {
      return NextResponse.json(
        { error: 'No email domains available' },
        { status: 500 }
      );
    }

    // Use the first available domain
    const domain = domains[0];
    const randomString = Math.random().toString(36).substring(2, 10);
    const email = `${randomString}@${domain.domain}`;
    const password = Math.random().toString(36).substring(2, 15);

    // Create account
    const account = await mailtmClient.createAccount(email, password);

    return NextResponse.json({
      success: true,
      account: {
        id: account.id,
        address: account.address,
        token: account.token,
      },
    });
  } catch (error) {
    console.error('Generate email error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to generate email',
      },
      { status: 500 }
    );
  }
}
