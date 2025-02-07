import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsString, MaxLength } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsString()
  @MaxLength(20)
  readonly ra: string;
}
