import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsString()
  user_name: string;

  @IsString()
  user_email: string;

  @IsString()
  user_pw: string;

  @IsOptional()
  @IsString()
  refresh_token?: string;

  @IsOptional()
  @IsBoolean()
  is_expired?: boolean = false;
}