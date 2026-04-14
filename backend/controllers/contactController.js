const Contact   = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// POST /api/contact
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    await Contact.create({ name, email, message });

    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${name} — Hostel Haven`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #eee;border-radius:12px;">
          <h2 style="color:#FF5A3C;">New Contact Message</h2>
          <p style="color:#888;font-size:14px;margin-bottom:24px;">Hostel Haven Contact Form</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;width:100px;font-size:14px;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:14px;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#666;vertical-align:top;font-size:14px;">Message</td>
              <td style="padding:10px 0;line-height:1.6;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    res.json({ message: 'Message sent successfully.' });
  } catch (err) { next(err); }
};

module.exports = { sendMessage };