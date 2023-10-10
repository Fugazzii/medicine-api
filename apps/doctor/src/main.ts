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
