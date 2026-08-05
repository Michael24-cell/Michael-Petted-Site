const { Resend } = require('resend');

const TO_EMAIL = 'mpettedstudio@gmail.com';
const FROM_EMAIL = 'Michael Petted Acting Studio <onboarding@resend.dev>';

const REASON_LABELS = {
  'free-visit': 'Free Class Visit',
  enrollment: 'Enrollment',
  coaching: 'Private Coaching',
  general: 'General Inquiry',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      body = {};
    }
  }

  const { name, email, phone, reason, message, company } = body || {};

  // Honeypot — real visitors never fill this hidden field.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in your name, email, and message.' });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service is not configured yet. Please email mpettedstudio@gmail.com directly.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const reasonLabel = REASON_LABELS[reason] || 'General Inquiry';

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New website inquiry — ${reasonLabel}`,
      text: [
        `Reason: ${reasonLabel}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '—'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(502).json({ error: 'Could not send your message. Please try again or email mpettedstudio@gmail.com directly.' });
  }
};
