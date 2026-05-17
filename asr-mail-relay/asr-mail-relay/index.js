require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const verifyRequest = require('./utils/verifyRequest');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.TITAN_SMTP_HOST || 'smtp.titan.email',
  port: parseInt(process.env.TITAN_SMTP_PORT || '587', 10),
  secure: process.env.TITAN_SMTP_SECURE === 'true',
  auth: {
    user: process.env.TITAN_SMTP_USER,
    pass: process.env.TITAN_SMTP_PASS
  }
});

app.post('/send', async (req, res) => {
  try {
    if (!verifyRequest(req, process.env.MAIL_WEBHOOK_TOKEN)) {
      return res.status(401).send('Unauthorized');
    }

    const { from, to, subject, html } = req.body;
    if (!to || !subject || !html) {
      return res.status(400).send('Missing required fields');
    }

    await transporter.sendMail({
      from: from || process.env.MAIL_FROM || process.env.TITAN_SMTP_USER,
      to: to || process.env.MAIL_TO || process.env.TITAN_SMTP_USER,
      subject,
      html
    });

    res.status(204).end();
  } catch (err) {
    console.error('Relay error:', err);
    res.status(500).send('Relay failed');
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Mail relay listening on port ${port}`));
