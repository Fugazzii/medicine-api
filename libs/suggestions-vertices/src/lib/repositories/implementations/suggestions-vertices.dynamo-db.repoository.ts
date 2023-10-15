import { Injectable } from "@nestjs/common";
import { SuggestionVerticeEntity } from "../../entites";
import { SuggestionVerticesRepositoryInterface } from "../suggestions-vertices.reposiotry.interface";
import { DynamoDBService } from "@app/aws";
import { PutItemCommandInput } from "@aws-sdk/client-dynamodb";

@Injectable()
export class SuggestionsVerticeDynamoDbRepository implements SuggestionVerticesRepositoryInterface {
    
    public constructor(private readonly dynamoDbService: DynamoDBService) {}

    public async insert(suggestionVerticeEntity: SuggestionVerticeEntity): Promise<void> {
        const param: PutItemCommandInput = {
            TableName: "medicine_api-suggestion-vertices",
            Item: {
                form_id: { 
                    N: suggestionVerticeEntity.form_id.toString() 
                },
                suggestion_vertices: {
                    S: JSON.stringify(suggestionVerticeEntity.suggestion_vertices)
                }
            }
        };
        const r = await this.dynamoDbService.put(param);
        console.log(r);
    }

}