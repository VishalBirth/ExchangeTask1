import { NestFactory } from '@nestjs/core';
import { RateModule } from 'rate-module/rate.module';

async function bootstrap() {
  const app = await NestFactory.create(RateModule);
  await app.listen(3000);
}
bootstrap();
