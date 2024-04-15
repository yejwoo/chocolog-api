import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  async getUsers(@Param('email') email: string) {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  @Post('')
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  // @TODO 유저 정보 업데이트 수정 필요
  @Patch('/:email')
  async updateUser(@Param('email') email: string, @Body() user: User) {
    const updatedUser = await this.userService.updateUser(email, user);
    if (!updatedUser) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return updatedUser;
  }

  @Delete('/:email')
  async deleteUser(@Param('email') email: string) {
    const deletedUser = await this.userService.deleteUser(email);
    if (!deletedUser) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return deletedUser;
  }
}
