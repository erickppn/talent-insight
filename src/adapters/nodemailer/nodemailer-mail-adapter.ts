import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1bdf2c1cf869b0",
    pass: "62421d940bab47"
  }
});

export class NodeMailerMailAdapter implements MailAdapter{
  async sendMail({ to, subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Talent Insight <no-reply@talentinsight.com>',
      to,
      subject,
      html: body,
    });
  };
}