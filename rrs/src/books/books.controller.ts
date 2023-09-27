import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/decoretors/role';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles('createBook')
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Roles('findAllBooks')
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Roles('findBookById')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }
  @Roles('updateBook')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(+id, updateBookDto);
  }
  @Roles('deleteBook')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
