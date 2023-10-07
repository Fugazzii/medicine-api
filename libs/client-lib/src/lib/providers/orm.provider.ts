import { ClientTypeormRepository } from "../repositories";
import { ORM_SOURCE_TOKEN, OrmSource } from "../tokens";

const ormNameToRepository = {
    "TYPEORM": ClientTypeormRepository,
    "PRISMA": null
};

export class OrmProvider {
    
    public static forRoot(ormSource: OrmSource) {
        return {
            provide: ORM_SOURCE_TOKEN,
            useClass: ormNameToRepository[ormSource]    
        }
    }

}