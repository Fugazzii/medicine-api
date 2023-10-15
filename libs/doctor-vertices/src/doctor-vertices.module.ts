import { DynamoDBService } from "@app/aws";
import { Module } from "@nestjs/common";
import { DOCTOR_VERTICE_DYNAMO_DB_REPOSITORY_TOKEN, DoctorVerticeDynamoDbRepository } from "./lib/repositories";
import { ConfigService } from "@nestjs/config";
import { DoctorVerticesService } from "./lib/services";

@Module({
    providers: [
        ConfigService,
        DynamoDBService,
        {
            provide: DOCTOR_VERTICE_DYNAMO_DB_REPOSITORY_TOKEN,
            useClass: DoctorVerticeDynamoDbRepository
        },
        DoctorVerticesService
    ],
    exports: [
        DOCTOR_VERTICE_DYNAMO_DB_REPOSITORY_TOKEN,
        DoctorVerticesService
    ]
})
export class DoctorVerticesModule {}
