import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { CustomValidatorPipe } from './lib/common/pipe/validation.pipe';
import { ExceptionsFilter } from './lib/common/filters/http-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix("api")
  
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: [VERSION_NEUTRAL, '1']
  })
  app.useGlobalPipes(CustomValidatorPipe());
  
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapterHost));
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}/`);

}
bootstrap();
