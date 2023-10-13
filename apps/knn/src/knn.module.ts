import { Module } from "@nestjs/common";
import { KnnController } from "./knn.controller";
import { AwsModule } from "@app/aws";
import { CommonModule } from "@app/common";
import { DoctorVerticesModule, DoctorVerticesService } from "@app/doctor-vertices";

@Module({
    imports: [
        AwsModule, 
        CommonModule,
        DoctorVerticesModule
    ],
    controllers: [KnnController],
    providers: [
        DoctorVerticesService
    ]
})
export class KnnModule {}
