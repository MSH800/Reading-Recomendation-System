import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';

@ValidatorConstraint({ name: 'isBook', async: true })
@Injectable()
export class isBook implements ValidatorConstraintInterface {
  constructor(private readonly booksService: BooksService) {}

  async validate(book_id: number): Promise<boolean> {
    const book = await this.booksService.findOne(book_id);
    if (!book.status) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'A valid book_id must be entered';
  }
}
