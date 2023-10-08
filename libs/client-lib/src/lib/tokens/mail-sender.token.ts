export const MAIL_SENDER_TOKEN = Symbol("MAIL_SENDER_TOKEN");

export enum MailSenderSource {
    AWS_SES = "AWS_SES",
    SEND_GRID = "SEND_GRID"
}