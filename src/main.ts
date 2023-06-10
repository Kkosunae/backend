import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 허용
  app.enableCors({
    origin: function (origin, callback) {
      callback(null, true);
    },
  });

  // local 테스트 시 프론트 3000을 피해 3001번으로 열었음.
  await app.listen(3001);
}
bootstrap();
