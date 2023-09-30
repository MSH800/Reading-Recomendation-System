/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IntervalsService } from 'src/intervals/intervals.service';
import { Inject, forwardRef } from '@nestjs/common';

export class BookRepository extends Repository<Book> {
  constructor(
    @InjectRepository(Book) private readonly BooksRepository: Repository<Book>,
    @Inject(forwardRef(() => IntervalsService))
    private readonly intervalsService: IntervalsService,
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
      return { status: 0, data: null, msg: err + ' ' };
    }
  }

  public async findAll() {
    try {
      const books = await this.BooksRepository.find({});
      if (books.length) {
        return { status: 1, data: books, msg: 'books found' };
      }
      return { status: 0, data: [], msg: 'no books found' };
    } catch (err) {
      return { status: 0, data: null, msg: err + ' ' };
    }
  }

  public async top5() {
    try {
      const books = await this.BooksRepository.createQueryBuilder('b')
        .select('*')
        .from(Book, 'book')
        .orderBy('book.num_of_read_pages', 'DESC')
        .limit(5)
        .execute();
      if (books.length) {
        return { status: 1, data: books, msg: 'books found' };
      }
      return { status: 0, data: [], msg: 'no books found' };
    } catch (err) {
      return { status: 0, data: null, msg: err + ' ' };
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
      return { status: 0, data: null, msg: err + ' ' };
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
      return { status: 0, data: null, msg: err + ' ' };
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
          const intervals = (
            await this.intervalsService.findByBookwithConId(id)
          ).data;
          let check = false;
          if (intervals) {
            intervals.forEach((interval) => {
              if (interval.end_page > updateBookDto.num_of_pages) {
                check = true;
                return;
              }
            });
          }
          if (check) {
            return {
              status: 0,
              data: null,
              msg: 'book intervals contain an interval with an end_page > num_of_pages',
            };
          }
          book['num_of_pages'] = updateBookDto.num_of_pages;
        }

        if (
          updateBookDto.num_of_read_pages ||
          updateBookDto.num_of_read_pages == 0
        ) {
          book['num_of_read_pages'] = updateBookDto.num_of_read_pages;
        }

        if (book['num_of_read_pages'] > book['num_of_pages']) {
          return {
            status: 0,
            data: null,
            msg: 'num_of_read_pages cannot be > num_of_pages',
          };
        }
        book = await this.BooksRepository.save(book);
        return { status: 1, data: book, msg: 'book updated' };
      }
      return { status: 0, data: null, msg: 'no book found' };
    } catch (err) {
      return { status: 0, data: null, msg: err + ' ' };
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
      return { status: 0, data: null, msg: err + ' ' };
    }
  }

  public updateByIntervals(book_id: number, intervals: any[]) {
    console.log(intervals);
    if (intervals) {
      const start = [intervals[0].start_page];
      const end = [intervals[0].end_page];
      for (let i = 1; i < intervals.length; i++) {
        const nstart_page = intervals[i].start_page;
        const nend_page = intervals[i].end_page;
        for (let j = 0; j < start.length; j++) {
          if (nstart_page > end[j]) {
            start.push(nstart_page);
            end.push(nend_page);
            break;
          } else if (nstart_page <= end[j]) {
            if (end[j] < nend_page) {
              end[j] = nend_page;
            }
          }
        }
      }
      const pages = this.comp_uniq_pages(start, end);
      this.updateBook(book_id, { num_of_read_pages: pages });
      return { status: 0, data: pages, msg: 'num_of_read_pages computed' };
    }
    console.log(0);
    this.updateBook(book_id, { num_of_read_pages: 0 });
    return { status: 0, data: 0, msg: 'num_of_read_pages computed' };
  }

  comp_uniq_pages(start: number[], end: number[]) {
    let p = 0;
    for (let i = 0; i < start.length; i++) {
      const sp = start[i];
      const ep = end[i];
      const exp = ep - sp + 1;
      p = p + exp;
    }
    return p;
  }
}
