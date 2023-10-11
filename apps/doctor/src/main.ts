/**
 * * Easy ----------------------------------------------------->
 * TODO: Implement pipes/schemas for doctor
 * TODO: Test doctor auth
 * TODO: Write unit tests for most of the services
 * TODO: Handle errors effectively
 * ? Medium --------------------------------------------------->
 * TODO: Write e2e automated tests
 * TODO: Encrypt all data of client with AWS KMS
 * ! Hard ----------------------------------------------------->
 * TODO: Create microservice with vector database to handle ML
 * TODO: Use message broker between microservices
 * TODO: Build AWS infrastructure
 */

import { NestFactory } from "@nestjs/core";
import { DoctorModule } from "./doctor.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(DoctorModule);
  app.enableCors();
  app.setGlobalPrefix("/api/doctor");

  const config = new DocumentBuilder()
    .setTitle("Doctor api")
    .setDescription("This is API for doctor side in medicine-api")
    .setVersion("1.0")
    .addTag("Doctor")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(3000);
}
bootstrap();
