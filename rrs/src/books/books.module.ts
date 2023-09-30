import { Module, forwardRef } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookRepository } from './book.repository';
import { IntervalsModule } from 'src/intervals/intervals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => IntervalsModule),
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
  exports: [BooksService],
})
export class BooksModule {}
