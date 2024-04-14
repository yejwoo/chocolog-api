import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';

const bcrypt = require('bcrypt');

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/:id')
  getUser(@Param() uid: number) {
    return this.authService.getUser(uid);
  }

  @Post('signup')
  async signUp(@Body() userData: CreateUserDto) {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(userData.user_pw, 10);
    userData.user_pw = hashedPassword;

    // 유저 데이터 저장
    const user = await this.authService.register(userData);

    // 토큰 생성 및 리프레쉬 토큰 DB에 저장
    const token = await this.authService.createToken(user.uid, user.user_email);
    await this.authService.updateRefreshToken(user.uid, token.refresh_token);

    // 저장된 유저 정보와 토큰 정보 반환
    return {
      ...user,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  @Post('signin')
  async signin(@Body() signinData: SignInDto, @Res() res: Response) {
    const user = await this.authService.validateUser(
      signinData.user_email,
      signinData.user_pw,
    );
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.createToken(user.uid, user.email);

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // HTTPS에서만 쿠키를 전송
      path: '/',
      sameSite: 'strict', // CSRF 공격 방지
    });

    res.cookie('refresh_token', token.refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    await this.authService.updateRefreshToken(user.uid, token.refresh_token);
    
    return res.status(HttpStatus.OK).json({ message: 'Login successful' });
  }

  // @TODO 리프레쉬 토큰 처리
  // 클라이언트가 엔드포인트에 리프레쉬 토큰을 포함하여 POST 요청을 보냅니다.
  // 서버는 리프레쉬 토큰의 유효성을 검사하고, 유효한 경우 새 액세스 토큰과 리프레쉬 토큰을 발급합니다.
  // 클라이언트는 새로 발급받은 토큰을 다시 저장하고, 이후의 요청에 사용합니다.
  @Post('update-token')
  async updateToken(@Body('refresh_token') refreshToken: string) {
    const userData = this.authService.verifyToken(refreshToken);
    const user = await this.authService.getUser(userData.uid);

    if (!user || user.refresh_token !== refreshToken) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    const newTokens = await this.authService.createToken(
      user.uid,
      user.user_email,
    );
    await this.authService.updateRefreshToken(
      user.uid,
      newTokens.refresh_token,
    );

    return {
      ...newTokens,
      user,
    };
  }

  // @Delete('delete')
  // async deleteUser(@Req() req) {
  //   return this.usersService.remove(req.user.id);
  // }

  // 회원 정보 수정
}
