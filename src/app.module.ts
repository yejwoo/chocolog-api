import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LogService } from './log/log.service';
import { LogController } from './log/log.controller';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from './log/log.module';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 환경변수 사용
    }),
    LogModule,
    S3Module,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, LogController, AuthController],
  providers: [LogService, S3Service, AuthService],
})
export class AppModule {}


