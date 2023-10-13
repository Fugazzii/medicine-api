import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SnsService {
    private readonly snsClient: SNSClient;

    public constructor(private readonly configService: ConfigService) {
        this.snsClient = new SNSClient({
            credentials: {
                accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.get<string>("AWS_SECRET_ACCESS_KEY")
            }
        });
    }

    public async publish(message: string, topicArn: string, messageGroupdId: string): Promise<void> {
        const publishCommand = new PublishCommand({
            TopicArn: topicArn,
            Message: message,
            MessageGroupId: messageGroupdId
        });

        await this.snsClient.send(publishCommand);  
    }
}
