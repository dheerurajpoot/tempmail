import { NextResponse } from 'next/server';
import { mailtmClient } from '@/lib/mailtm';

export async function POST() {
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
    const err = error as Error & { status?: number };
    const status = typeof err?.status === 'number' && err.status >= 400 ? err.status : 503;
    const message = err?.message || 'Failed to generate email';
    return NextResponse.json({ error: message }, { status });
  }
}
