import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'Email do usuário para autenticação',
    example: 'usuario@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 's3nh4S3gur@',
  })
  @IsNotEmpty()
  password: string;
}
