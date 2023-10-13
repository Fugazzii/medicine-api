import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SnsService {

    private readonly snsClient: SNSClient;

    public constructor() {
        this.snsClient = new SNSClient();
    }

    public async publishMessage(message: string, topicArn: string): Promise<void> {
        const publishCommand = new PublishCommand({
            TopicArn: topicArn,
            Message: message,
        });

        await this.snsClient.send(publishCommand);
    }
}