export const config = { runtime: 'edge' };

export default async function (req) {
  // FORCE VERCEL TO TREAT THIS AS A FUNCTION
  if (req.method === 'OPTIONS') return new Response('OK');

  try {
    // 1. RAW GIST LINK (Make sure this is the 'usercontent' link)
    const listUrl = 'https://gist.githubusercontent.com/youssefben6/45060bfad1220964609efa2bf84bd6c6/raw/gistfile1.txt';
    
    const res = await fetch(listUrl);
    const text = await res.text();
    const emails = text.split('\n').map(e => e.trim()).filter(e => e.includes('@'));

    // 2. SENDING ENGINE (MailChannels 2026 Bridge)
    for (let email of emails.slice(0, 50)) {
      await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: email }] }],
          from: { email: 'alert@' + req.headers.get('host'), name: 'System' },
          subject: 'Account Update',
          content: [{ type: 'text/plain', value: 'Verify here: ' }],
        }),
      });
    }

    return new Response('SUCCESS_BLAST_ACTIVE', { status: 200 });
  } catch (err) {
    return new Response('SYSTEM_ERROR: ' + err.message, { status: 500 });
  }
}
