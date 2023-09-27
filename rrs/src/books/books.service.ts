import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './book.repository';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}
  create(createBookDto: CreateBookDto) {
    if (createBookDto['num_of_read_pages']) {
      if (createBookDto['num_of_read_pages'] > createBookDto['num_of_pages']) {
        return {
          status: 0,
          data: {},
          msg: 'num_of_read_pages can not be > num_of_pages',
        };
      }
    }
    return this.bookRepository.createBook(createBookDto);
  }

  findAll() {
    return this.bookRepository.findAll();
  }

  findOne(id: number) {
    return this.bookRepository.findById(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.updateBook(id, updateBookDto);
  }

  remove(id: number) {
    return this.bookRepository.deleteBook(id);
  }
}
