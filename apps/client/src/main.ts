import { NestFactory } from "@nestjs/core";
import { ClientModule } from "./client.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);

  app.setGlobalPrefix("/api/client");

  await app.listen(3001);
}
bootstrap();
