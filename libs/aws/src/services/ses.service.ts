import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

@Injectable()
export class SesService {
    private readonly sesClient: SESClient;

    public constructor(private readonly configService: ConfigService) {
        this.sesClient = new SESClient({
            region: this.configService.get<string>("AWS_REGION"),
            credentials: {
                accessKeyId:
                    this.configService.get<string>("AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.get<string>(
                    "AWS_SECRET_ACCESS_KEY"
                )
            }
        });
    }

    public async sendMail(
        to: string,
        subject: string,
        body: string
    ): Promise<void> {
        const sendEmailCommand = new SendEmailCommand({
            Destination: {
                ToAddresses: [to]
            },
            Message: {
                Body: {
                    Text: {
                        Data: body
                    }
                },
                Subject: {
                    Data: subject
                }
            },
            Source: this.configService.get<string>("AWS_SES_SERVICE_EMAIL")
        });

        await this.sesClient.send(sendEmailCommand);
    }
}
