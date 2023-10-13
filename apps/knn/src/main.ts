import { NestFactory } from "@nestjs/core";
import { KnnModule } from "./knn.module";

async function bootstrap() {
    const app = await NestFactory.create(KnnModule);
    await app.listen(3002);
}
bootstrap();
