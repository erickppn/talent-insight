import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";
import { nodemailerTransportConfig } from '../../config/nodemailer';

const transport = nodemailer.createTransport(nodemailerTransportConfig);

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