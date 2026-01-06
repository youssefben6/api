export const config = { runtime: 'edge' };

export default async function (req) {
  // This sends a small test to YOUR email first to prove it works
  try {
    const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: 'YOUR_EMAIL@GMAIL.COM' }] }],
        from: { email: 'test@' + req.headers.get('host'), name: 'System' },
        subject: 'Vercel is Working',
        content: [{ type: 'text/plain', value: 'The engine is officially live.' }],
      }),
    });

    return new Response('Vercel is officially sending mail!');
  } catch (e) {
    return new Response('Error: ' + e.message);
  }
}
