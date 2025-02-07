import { IsInt, Min, IsOptional, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export interface IPagination {
  page?: number;
  limit?: number;
  sort?: 'ASC' | 'DESC';
  sortBy?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export class PaginationDto implements IPagination {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sort?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsString()
  sortBy?: string = 'id';
}
