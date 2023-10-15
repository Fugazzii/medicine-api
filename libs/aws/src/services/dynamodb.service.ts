import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    GetItemCommandOutput,
    PutItemCommandOutput,
    PutItemCommandInput,
    GetItemCommandInput,
    ScanCommandInput,
    ScanCommandOutput,
    ScanCommand
} from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DynamoDBService {
    private readonly client: DynamoDBClient;

    public constructor(private readonly configService: ConfigService) {
        
        const region = this.configService.get<string>("AWS_REGION");
        const accessKey = this.configService.get<string>("AWS_ACCESS_KEY_ID");
        const secretAccessKey = this.configService.get<string>("AWS_SECRET_ACCESS_KEY");
        
        this.client = new DynamoDBClient({
            region,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretAccessKey
            }
        });
    }

    public async put(params: PutItemCommandInput): Promise<PutItemCommandOutput> {
        const command = new PutItemCommand(params);
        return this.client.send(command);
    }

    public async get(params: GetItemCommandInput): Promise<GetItemCommandOutput> {
        const command = new GetItemCommand(params);
        return this.client.send(command);
    }

    public async scan(param: ScanCommandInput): Promise<ScanCommandOutput> {
        const command = new ScanCommand(param);
        return this.client.send(command);
    }
    
}
