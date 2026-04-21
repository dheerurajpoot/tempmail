import { NextResponse } from 'next/server';
import { mailtmClient, oneSecMailClient } from '@/lib/mailtm';

export async function POST() {
  let mailtmError: Error | null = null;

  try {
    const domains = await mailtmClient.getDomains();
    if (!domains.length) {
      return NextResponse.json(
        { error: 'No email domains available right now. Try again shortly.' },
        { status: 503 }
      );
    }

    // Try a few domains to reduce upstream flakiness in production.
    const domainPool = domains.slice(0, 5);
    let lastError: Error | null = null;

    for (const domainEntry of domainPool) {
      try {
        const randomString = Math.random().toString(36).slice(2, 10);
        const email = `${randomString}@${domainEntry.domain}`;
        const password = Math.random().toString(36).slice(2, 15);
        const account = await mailtmClient.createAccount(email, password);
        return NextResponse.json(account);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Failed to create account');
      }
    }

    throw lastError ?? new Error('Failed to create account on available domains');
  } catch (error) {
    mailtmError = error instanceof Error ? error : new Error('Primary provider failed');
  }

  try {
    const fallbackAccount = await oneSecMailClient.createAccount();
    return NextResponse.json(fallbackAccount);
  } catch (error) {
    const fallbackError =
      error instanceof Error ? error : new Error('Secondary provider failed');

    return NextResponse.json(
      {
        error: 'Both temporary email providers are currently unavailable. Please retry shortly.',
        details: {
          primary: mailtmError?.message || 'Primary provider failed',
          secondary: fallbackError.message,
        },
      },
      { status: 503 }
    );
  }
}
