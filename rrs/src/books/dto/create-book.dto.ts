import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  book_name;

  @IsInt()
  num_of_pages;

  @IsInt()
  @IsOptional()
  num_of_read_pages;
}
