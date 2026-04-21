import { NextResponse } from 'next/server';
import { mailtmClient } from '@/lib/mailtm';

export async function POST() {
  try {
    const domains = await mailtmClient.getDomains();
    if (!domains?.length || !domains[0]?.domain) {
      return NextResponse.json(
        { error: 'No email domains available right now. Try again shortly.' },
        { status: 503 }
      );
    }

    const domain = domains[0].domain as string;
    const randomString = Math.random().toString(36).slice(2, 10);
    const email = `${randomString}@${domain}`;
    const password = Math.random().toString(36).slice(2, 15);

    const account = await mailtmClient.createAccount(email, password);
    return NextResponse.json(account);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to generate email';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
