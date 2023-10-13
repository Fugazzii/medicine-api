import { Module } from "@nestjs/common";
import { KnnController } from "./knn.controller";
import { AwsModule } from "@app/aws";
import { CommonModule } from "@app/common";

@Module({
    imports: [AwsModule, CommonModule],
    controllers: [KnnController],
    providers: []
})
export class KnnModule {}
