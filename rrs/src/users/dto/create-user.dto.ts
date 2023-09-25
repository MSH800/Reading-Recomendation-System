import { IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['admin', 'user'])
  role: string;
}
