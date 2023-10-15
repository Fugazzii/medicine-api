import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    GetItemCommandOutput,
    PutItemCommandOutput,
    PutItemCommandInput,
    GetItemCommandInput
} from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DynamoDBService {
    private readonly client: DynamoDBClient;

    public constructor(private readonly configService: ConfigService) {
        this.client = new DynamoDBClient({
            region: "us-east-1",
            credentials: {
                accessKeyId: "AKIARGZ5XCI5N63UTC46",
                secretAccessKey: "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"
            }
        });
    }

    public put(params: PutItemCommandInput): Promise<PutItemCommandOutput> {
        const command = new PutItemCommand(params);
        return this.client.send(command);
    }

    public get(params: GetItemCommandInput): Promise<GetItemCommandOutput> {
        const command = new GetItemCommand(params);
        return this.client.send(command);
    }
}
