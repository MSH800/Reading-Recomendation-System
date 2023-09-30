import { IsInt, Validate } from 'class-validator';
import { isBook } from 'src/validations/isBook';
import { isUser } from 'src/validations/isUser';

export class CreateIntervalDto {
  @IsInt()
  @Validate(isUser)
  user_id;

  @IsInt()
  @Validate(isBook)
  book_id;

  @IsInt()
  start_page;

  @IsInt()
  end_page;
}
