/**
 * Nest imports
 */
import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

/**
 * Lib imports
 */
import { config } from "./database.config";

@Module({})
export class DatabaseModule {
    public static forRoot(configuration: config, entities: any[]): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRoot({
                    ...configuration,
                    entities: entities
                })
            ],
            providers: [],
            exports: []
        };
    }
}
