/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export class BookRepository extends Repository<Book> {
  constructor(
    @InjectRepository(Book) private readonly BooksRepository: Repository<Book>,
  ) {
    super(
      BooksRepository.target,
      BooksRepository.manager,
      BooksRepository.queryRunner,
    );
  }

  public async createBook(createBookDto: CreateBookDto) {
    try {
      const book = await this.BooksRepository.create(createBookDto);
      if (book) {
        await this.BooksRepository.save(book);
        return { status: 1, data: book, msg: 'book created' };
      }
      return { status: 0, data: null, msg: 'book creation error' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findAll() {
    try {
      const books = await this.BooksRepository.find();
      if (books.length) {
        return { status: 1, data: books, msg: 'books found' };
      }
      return { status: 0, data: [], msg: 'no books found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findById(id: number) {
    try {
      const book = await this.BooksRepository.findOneBy({ bookid: id });
      if (book) {
        return { status: 1, data: book, msg: 'book found' };
      }
      return { status: 0, data: null, msg: 'no book found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findByBookName(name: string) {
    try {
      const book = await this.BooksRepository.findOne({
        where: { book_name: name },
      });
      if (book) {
        return { status: 1, data: book, msg: 'book found' };
      }
      return { status: 0, data: null, msg: 'no book found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async updateBook(id: number, updateBookDto: UpdateBookDto) {
    try {
      let book = (await this.findById(id)).data;
      if (book) {
        if (updateBookDto.book_name) {
          book['book_name'] = updateBookDto.book_name;
        }
        if (updateBookDto.num_of_pages) {
          book['num_of_pages'] = updateBookDto.num_of_pages;
        }
        if (updateBookDto.num_of_read_pages) {
          book['num_of_read_pages'] = updateBookDto.num_of_read_pages;
        }
        if (book['num_of_read_pages'] > book['num_of_pages']) {
          return {
            status: 0,
            data: {},
            msg: 'num_of_read_pages cannot be > num_of_pages',
          };
        }
        book = await this.BooksRepository.save(book);
        return { status: 1, data: book, msg: 'book updated' };
      }
      return { status: 0, data: null, msg: 'no book found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async deleteBook(id: number) {
    try {
      const book = (await this.findById(id)).data;
      if (book) {
        await this.BooksRepository.remove(book);
        return { status: 1, data: book, msg: 'book deleed' };
      }
      return { status: 0, data: null, msg: 'no book found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }
}
