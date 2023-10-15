import { Module } from "@nestjs/common";
import { SuggestionsVerticesService } from "./lib/services/suggestions-vertices.service";
import { ConfigService } from "@nestjs/config";
import { SUGGESTION_VERTICE_REPOSITORY_TOKEN } from "./lib/repositories";
import { SuggestionsVerticeDynamoDbRepository } from "./lib/repositories/implementations/suggestions-vertices.dynamo-db.repoository";

@Module({
    providers: [
        SuggestionsVerticesService,
        ConfigService,
        {
            provide: SUGGESTION_VERTICE_REPOSITORY_TOKEN,
            useClass: SuggestionsVerticeDynamoDbRepository
        }
    ],
    exports: [
        SuggestionsVerticesService,
        SUGGESTION_VERTICE_REPOSITORY_TOKEN
    ]
})
export class SuggestionsVerticesModule {}
