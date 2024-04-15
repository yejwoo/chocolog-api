import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async register(@Body() userData: CreateUserDto) {
    return await this.authService.register(userData);
  }

  @UseGuards(SignInGuard)
  @Post('/testlogin')
  async testlogin(@Request() req, @Response() res) {
    if (!req.cookies['signin'] && req.user) {
      res.cookie('signin', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 1, // 하루
      });
    }
    return res.send({ success: true });
  }

  @Post('/signin')
  async signin(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.user_email,
      req.body.user_pw,
    );

    if (userInfo) {
      res.cookie('signin', JSON.stringify(userInfo), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      });

      return res.send({ success: true, data: userInfo.user_email });
    } else {
      return res.send({
        success: false,
        message: 'Login failed. Invalid email or password.',
      });
    }
  }

  @UseGuards(SignInGuard)
  @Get('/test-guard')
  testGuard() {
    return '이 글은 로그인시에만 보입니다.';
  }
}
