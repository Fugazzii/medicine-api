import { Inject, Injectable } from "@nestjs/common";
import { SUGGESTION_VERTICE_REPOSITORY_TOKEN, SuggestionVerticesRepositoryInterface } from "../repositories";
import { SuggestionVerticeEntity } from "../entites";

@Injectable()
export class SuggestionsVerticesService {
    
    public constructor(
        @Inject(SUGGESTION_VERTICE_REPOSITORY_TOKEN) private readonly suggestionRepository: SuggestionVerticesRepositoryInterface
    ) {}
    
    public async insert(doctorVerticeEntity: SuggestionVerticeEntity) {
        return this.suggestionRepository.insert(doctorVerticeEntity);
    }

}