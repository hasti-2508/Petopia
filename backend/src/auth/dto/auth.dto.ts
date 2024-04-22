import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}

export class ResetPasswordDto{

  @IsEmail()
  email: string
}


// export class ForgotPasswordDto {
//   email: string;
// }

// export class ResetPasswordDto {
//   token: string;
//   newPassword: string;
// }