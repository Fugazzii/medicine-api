import { SesService } from "@app/aws";
import { MailSenderSource, MAIL_SENDER_TOKEN } from "@app/common/lib/tokens";

const mailSenderToMailService = {
    AWS_SES: SesService,
    SEND_GRID: null
};

export class MailSenderProvider {
    public static forRoot(mailSenderSource: MailSenderSource) {
        return {
            provide: MAIL_SENDER_TOKEN,
            useClass: mailSenderToMailService[mailSenderSource]
        };
    }
}
