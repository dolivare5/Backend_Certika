import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
    static ConfigSwaggerModule(app: INestApplication): void {
        const config = new DocumentBuilder()
            .addBearerAuth()
            .setTitle("Library Store RESTFull API")
            .setDescription("API RESTFull para las gestión de libros y autores de una biblioteca")
            .setVersion("v1.0.0")
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/v1/libary/docs', app, document, {
            swaggerOptions: {
                filter: true,
                showRequestDuration: true,
            },
        });
    };
};