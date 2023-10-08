export interface MailSenderInterface {
    sendMail(to: string, subject: string, body: string): Promise<void>
}