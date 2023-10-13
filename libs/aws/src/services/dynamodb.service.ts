import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    GetItemCommandOutput,
    PutItemCommandOutput
} from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DynamoDBService {
    private readonly client: DynamoDBClient;

    public constructor(private readonly configService: ConfigService) {
        this.client = new DynamoDBClient({
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

    public put(params: PutItemCommand): Promise<PutItemCommandOutput> {
        return this.client.send(params);
    }

    public get(params: GetItemCommand): Promise<GetItemCommandOutput> {
        return this.client.send(params);
    }
}
