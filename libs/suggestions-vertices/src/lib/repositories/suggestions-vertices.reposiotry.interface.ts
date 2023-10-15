import { SuggestionVerticeEntity } from "../entites";

export const SUGGESTION_VERTICE_REPOSITORY_TOKEN = Symbol("SUGGESTION_VERTICE_REPOSITORY_TOKEN");

export interface SuggestionVerticesRepositoryInterface {
    insert(suggestionVerticeEntity: SuggestionVerticeEntity): Promise<void>;
}