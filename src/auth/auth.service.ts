import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // 생서앚에서 UserService를 주입받아 사용
  constructor(private userService: UserService) {}

  async register(userData: CreateUserDto) {
    // 가입된 유저 있는지 체크
    const user = await this.userService.getUser(userData.user_email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // 패스워드 암호화
    const encryptedPassword = await bcrypt.hash(userData.user_pw, 10);

    // DB에 저장
    try {
      const user = await this.userService.createUser({
        ...userData,
        user_pw: encryptedPassword,
      });
      // 반환 값에는 비밀번호 미포함
      user.user_pw = undefined;
      return user;
    } catch (e) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email);
    if (!user) {
      throw new NotFoundException(`user ${email} not found`);
    }

    const {user_pw: hashedPassword, ...userInfo} = user;

    if(bcrypt.compareSync(password, hashedPassword)) {
      return userInfo;
    }

    return null;
  }
}
