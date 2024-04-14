import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LogService } from './log/log.service';
import { LogController } from './log/log.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 환경변수 사용
    }),
    AuthModule,
  ],
  controllers: [AppController, LogController],
  providers: [LogService],
})
export class AppModule {}
