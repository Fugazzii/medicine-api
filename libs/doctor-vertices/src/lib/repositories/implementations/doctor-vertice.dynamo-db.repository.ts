import { Injectable } from "@nestjs/common";
import { DoctorVerticeRepositoryInterface } from "../doctor-vertice.repository.interface";
import { DynamoDBService } from "@app/aws";
import { GetItemCommandInput, GetItemCommandOutput, PutItemCommandInput, PutItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { DoctorDynamoDbVerticeModel } from "../../models";
import { createHash, randomBytes, randomInt, randomUUID } from "crypto";
import { Vertex } from "@app/common";
import { DoctorVerticeEntity } from "../../entities";

@Injectable()
export class DoctorVerticeDynamoDbRepository implements DoctorVerticeRepositoryInterface {
    public constructor(private readonly dynamoDbService: DynamoDBService) {}

    public async insert(doctorModel: DoctorDynamoDbVerticeModel): Promise<void> {
        const param: PutItemCommandInput = {
            TableName: "doctor_vertices",
            Item: {
                id: { 
                    N: String(randomInt(Math.pow(2, 31)))
                },
                doctor_id: { 
                    N: String(doctorModel.doctor_id) 
                },
                key: { 
                    N: String(this._calculateKey(doctorModel.vertex)) 
                },
                vertex: { 
                    S: JSON.stringify(doctorModel.vertex)
                }
            }
        };

        await this.dynamoDbService.put(param);
    }

    public async findOne(doctorId: number): Promise<DoctorDynamoDbVerticeModel> {
        const param: GetItemCommandInput = {
            TableName: "doctor_vertices",
            Key: {
                doctor_id: { N: String(doctorId) },
            }
        };

        const vertex: GetItemCommandOutput = await this.dynamoDbService.get(param);

        const result: DoctorVerticeEntity = {
            id: parseInt(vertex.Item.id.N, 10),
            doctor_id: parseInt(vertex.Item.id.N, 10),
            key: parseInt(vertex.Item.key.N, 10),
            vertex: JSON.parse(vertex.Item.vertex.S)
        };

        return result;
    }

    private _calculateKey(vertex: Vertex): number {
        const vertexString = JSON.stringify(vertex);
        const hash = createHash('sha256')
            .update(vertexString)
            .digest('hex');

        const key = parseInt(hash, 16);

        return key >= 0 ? key : -key;   
    }
}
