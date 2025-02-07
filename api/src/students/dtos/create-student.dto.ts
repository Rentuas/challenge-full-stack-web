import { IsString, IsEmail, MaxLength } from 'class-validator';
import { IsCpfValid } from '../../common/decorators/cpf-validator.decorator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @IsCpfValid({ message: 'CPF inválido' })
  cpf: string;

  @IsString()
  @MaxLength(20)
  ra: string;
}
