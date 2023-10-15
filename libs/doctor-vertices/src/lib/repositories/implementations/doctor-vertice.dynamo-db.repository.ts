import { Injectable } from "@nestjs/common";
import { DoctorVerticeRepositoryInterface } from "../doctor-vertice.repository.interface";
import { DynamoDBService } from "@app/aws";
import { GetItemCommandInput, GetItemCommandOutput, PutItemCommandInput, PutItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { DoctorDynamoDbVerticeModel } from "../../models";
import { DoctorVerticeEntity } from "../../entities";

@Injectable()
export class DoctorVerticeDynamoDbRepository implements DoctorVerticeRepositoryInterface {
    public constructor(private readonly dynamoDbService: DynamoDBService) {}

    public async insert(doctorModel: DoctorDynamoDbVerticeModel): Promise<void> {
        const param: PutItemCommandInput = {
            TableName: "medicine_api",
            Item: {
                doctor_id: { 
                    N: doctorModel.doctor_id.toString() 
                },
                vertex: { 
                    S: JSON.stringify(doctorModel.vertex)
                }
            }
        };

        const r = await this.dynamoDbService.put(param);
    }

    public async findOne(doctorId: number): Promise<DoctorDynamoDbVerticeModel> {
        const param: GetItemCommandInput = {
            TableName: "medicine_api",
            Key: {
                doctor_id: { N: String(doctorId) },
            }
        };

        const vertex: GetItemCommandOutput = await this.dynamoDbService.get(param);

        const result: DoctorVerticeEntity = {
            doctor_id: parseInt(vertex.Item.id.N, 10),
            vertex: JSON.parse(vertex.Item.vertex.S)
        };

        return result;
    }

}
