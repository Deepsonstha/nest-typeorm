import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { GlobalExceptionFilter } from './error_handler/global_error_handler';
import { globaleMiddlware } from './middleware/global_middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips any properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if extra fields are provided
      transform: true, // Automatically transforms payloads to match the DTO type
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // Change default status code if needed
      exceptionFactory: (errors) =>
        new HttpException(
          errors.map((err) => Object.values(err.constraints).join(', ')),
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );
  app.use(globaleMiddlware);

  await app.listen(3000);
}
bootstrap();
