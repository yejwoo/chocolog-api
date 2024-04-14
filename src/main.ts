import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // validator 데코레이터가 없는 속성은 제거
    forbidNonWhitelisted: true, // 화이트리스트에 없는 속성을 보내면 HttpException을 던짐
    transform: true, // url 파라미터를 컨트롤러에 정의된 타입으로 변환
  }));
  app.setGlobalPrefix('api');
  await app.listen(8000);
  
}
bootstrap();
