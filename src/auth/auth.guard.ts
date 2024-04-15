import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
// 추상화
export class SignInGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: any): Promise<boolean> {
    // 컨텍스트에서 리퀘스트 정보 가져옴
    const request = context.switchToHttp().getRequest();

    // 쿠키가 있으면 인증 완료된 것
    if (request.cookies.signin) {
      return true;
    }

    // 쿠키가 없으면 request의 body 정보 확인
    if(!request.body.user_email || !request.body.user_pw) {
      return false;
    }

    // 인증 로직
    const user = await this.authService.validateUser(
      request.body.user_email,
      request.body.user_pw,
    );

    if(!user) {
      return false;
    }

    request.user = user;
    return true;
  }
  
}
