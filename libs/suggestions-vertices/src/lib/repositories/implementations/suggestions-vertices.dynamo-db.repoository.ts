import { Injectable } from "@nestjs/common";
import { SuggestionVerticeEntity } from "../../entites";
import { SuggestionVerticesRepositoryInterface } from "../suggestions-vertices.reposiotry.interface";
import { DynamoDBService } from "@app/aws";
import { GetItemCommandInput, PutItemCommandInput } from "@aws-sdk/client-dynamodb";

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
        const _ = await this.dynamoDbService.put(param);
    }

    public async findOne(id: number): Promise<SuggestionVerticeEntity> {
        const param: GetItemCommandInput = {
            TableName: "medicine_api-suggestion-vertices",
            Key: {
                form_id: {
                    N: id.toString()
                }
            }
        };

        const output = await this.dynamoDbService.get(param);
        console.log(output);
        const result: SuggestionVerticeEntity = {
            form_id: id,
            suggestion_vertices: JSON.parse(output.Item.suggestion_vertices.S)
        };

        return result;
    }

}