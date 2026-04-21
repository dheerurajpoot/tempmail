const { mailtmClient } = require('./lib/mailtm');

async function test() {
  try {
    console.log('Fetching domains...');
    const domains = await mailtmClient.getDomains();
    console.log('Domains:', JSON.stringify(domains, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
  }
}

test();
