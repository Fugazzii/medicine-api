import { NestFactory } from '@nestjs/core';
import { KnnModule } from './knn.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(KnnModule);
  await app.listen();
}
bootstrap();
