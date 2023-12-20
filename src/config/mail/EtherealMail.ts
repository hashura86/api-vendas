import nodemailer from 'nodemailer'

interface IRequest {
  to: string
  body: string
}

export default class EtherealMail {
  static async sendEmail({ to, body }: IRequest): Promise<void> {
    const account = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    })

    const message = await transporter.sendMail({
      from: 'jojoribs@comoqescrev.br',
      to,
      subject: 'password recovery',
      text: body,
    })

    console.log('message sent: %s', message.messageId)
    console.log('preview url: %s', nodemailer.getTestMessageUrl(message))
  }
}
