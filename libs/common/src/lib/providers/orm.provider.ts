import { ClientTypeormRepository } from "@app/client-lib/lib/repositories";
import { OrmSource, ORM_SOURCE_TOKEN } from "@app/client-lib/lib/tokens";

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