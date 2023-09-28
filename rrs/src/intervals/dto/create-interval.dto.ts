import { IsInt } from 'class-validator';

export class CreateIntervalDto {
  @IsInt()
  user_id;

  @IsInt()
  book_id;

  @IsInt()
  start_page;

  @IsInt()
  end_page;
}
