import { NestFactory } from "@nestjs/core";
import { ClientModule } from "./client.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(ClientModule);
    app.enableCors();
    app.setGlobalPrefix("/api/client");

    const config = new DocumentBuilder()
        .setTitle("Client api")
        .setDescription("This is API for patient side in medicine-api")
        .setVersion("1.0")
        .addTag("Clients")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("swagger", app, document);
    await app.listen(3001);
}
bootstrap();
