import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsString()
  user_name: string;

  @IsString()
  user_email: string;

  @IsString()
  user_pw: string;
}