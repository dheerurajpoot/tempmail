import { mailtmClient } from '../lib/mailtm';

async function test() {
  try {
    console.log('--- TEST START ---');
    const domains = await mailtmClient.getDomains();
    console.log('--- TEST END ---');
    console.log('Result domains:', JSON.stringify(domains, null, 2));
  } catch (error) {
    console.error('--- TEST FAILED ---');
    console.error(error);
  }
}

test();
