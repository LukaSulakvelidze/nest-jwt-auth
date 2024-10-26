import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;

  rememberMe
}
