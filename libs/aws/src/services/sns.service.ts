import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "node:crypto";

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
            MessageGroupId: messageGroupdId,
            MessageDeduplicationId: randomUUID()
        });
        const r = await this.snsClient.send(publishCommand);
        console.log("Published", r);
    }
}
