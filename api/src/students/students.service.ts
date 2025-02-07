import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { ICreateStudent } from './interfaces/create-student.interface';
import { IUpdateStudent } from './interfaces/update-student.interface';
import { IPaginatedResponse, IPagination } from 'src/common/dto/pagination.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async register(createStudent: ICreateStudent): Promise<Student> {
    return this.studentRepository.create(createStudent);
  }

  async update(id: string, updateStudent: IUpdateStudent): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const updatedStudent = await this.studentRepository.save({
      ...student,
      ...updateStudent,
    });

    return updatedStudent;
  }

  async delete(id: string): Promise<void> {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    await this.studentRepository.remove(student);
  }

  async findAll({
    page = 1,
    limit = 10,
    sort = 'ASC',
    sortBy = 'id',
  }: IPagination): Promise<IPaginatedResponse<Student>> {
    const [data, total] = await this.studentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: sort },
    });

    return {
      total,
      page,
      limit,
      data,
    };
  }
}
