import { Inject, Injectable } from "@nestjs/common";
import { SUGGESTION_VERTICE_REPOSITORY_TOKEN, SuggestionVerticesRepositoryInterface } from "../repositories";
import { SuggestionVerticeEntity } from "../entites";

@Injectable()
export class SuggestionsVerticesService {
    
    public constructor(
        @Inject(SUGGESTION_VERTICE_REPOSITORY_TOKEN) private readonly suggestionRepository: SuggestionVerticesRepositoryInterface
    ) {}
    
    public async insert(suggestionVerticeEntity: SuggestionVerticeEntity) {
        return this.suggestionRepository.insert(suggestionVerticeEntity);
    }

    public async findByFormId(formId: number) {
        return this.suggestionRepository.findOne(formId);
    }
}