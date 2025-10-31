import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT,10) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});
export default {
  async send({ to, subject, html, text }) {
    return transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html, text });
  }
};
