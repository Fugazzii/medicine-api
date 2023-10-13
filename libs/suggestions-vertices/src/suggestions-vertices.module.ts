import { Module } from "@nestjs/common";
import { SuggestionsVerticesService } from "./lib/services/suggestions-vertices.service";

@Module({
    providers: [SuggestionsVerticesService],
    exports: [SuggestionsVerticesService]
})
export class SuggestionsVerticesModule {}
