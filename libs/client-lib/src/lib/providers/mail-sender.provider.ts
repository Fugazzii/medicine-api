import { SesService } from "@app/aws";
import { MAIL_SENDER_TOKEN, MailSenderSource } from "../tokens";

const mailSenderToMailService = {
    "AWS_SES": SesService,
    "SEND_GRID": null
};

export class MailSenderProvider {
    
    public static forRoot(mailSenderSource: MailSenderSource) {
        return {
            provide: MAIL_SENDER_TOKEN,
            useClass: mailSenderToMailService[mailSenderSource]    
        }
    }

}

export interface MailSenderInterface {
    sendMail(to: string, subject: string, body: string): Promise<void>
}