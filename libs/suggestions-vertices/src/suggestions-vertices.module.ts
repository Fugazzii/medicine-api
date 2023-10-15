import { Module } from "@nestjs/common";
import { SuggestionsVerticesService } from "./lib/services/suggestions-vertices.service";
import { ConfigService } from "@nestjs/config";
import { SUGGESTION_VERTICE_REPOSITORY_TOKEN, SuggestionsVerticeDynamoDbRepository } from "./lib/repositories";
import { DynamoDBService } from "@app/aws";

@Module({
    providers: [
        ConfigService,
        {
            provide: SUGGESTION_VERTICE_REPOSITORY_TOKEN,
            useClass: SuggestionsVerticeDynamoDbRepository
        },
        DynamoDBService,
        SuggestionsVerticesService
    ],
    exports: [
        SuggestionsVerticesService,
        SUGGESTION_VERTICE_REPOSITORY_TOKEN
    ]
})
export class SuggestionsVerticesModule {}
