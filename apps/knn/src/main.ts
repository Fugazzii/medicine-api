import { NestFactory } from "@nestjs/core";
import { KnnModule } from "./knn.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(KnnModule,
        {
            transport: Transport.NATS,
            options: {
                servers: ["nats://nats:4222"],
                queue: "doctors"
            }
        }
    );
    await app.listen();
}
bootstrap();
