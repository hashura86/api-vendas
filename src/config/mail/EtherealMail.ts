import nodemailer from 'nodemailer'
import HandlebarsTemplate from './HandlebarsTemplate'

interface IVariables {
  [key: string]: string | number
}

interface ITemplate {
  file: string
  variables: IVariables
}

interface IContact {
  name: string
  email: string
}

interface IRequest {
  to: IContact
  from?: IContact
  subject: string
  templateData: ITemplate
}

export default class EtherealMail {
  static async sendEmail({ to, from, subject, templateData }: IRequest): Promise<void> {
    const account = await nodemailer.createTestAccount()

    const mailTemplate = new HandlebarsTemplate()

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
      from: {
        name: from?.name || 'how to writ',
        address: from?.email || 'jojoribs@comoqescrev.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    })

    console.log('message sent: %s', message.messageId)
    console.log('preview url: %s', nodemailer.getTestMessageUrl(message))
  }
}
