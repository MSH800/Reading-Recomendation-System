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
import { IntervalsService } from './intervals.service';
import { CreateIntervalDto } from './dto/create-interval.dto';
import { UpdateIntervalDto } from './dto/update-interval.dto';
import { Roles } from 'src/decoretors/role';

@Roles('intervals')
@Controller('intervals')
export class IntervalsController {
  constructor(private readonly intervalsService: IntervalsService) {}

  @Post()
  create(@Body() createIntervalDto: CreateIntervalDto) {
    return this.intervalsService.create(createIntervalDto);
  }

  @Get()
  findAll() {
    return this.intervalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.intervalsService.findById(id);
  }

  @Get('/user/id')
  findByUserId(@Body('user_id', ParseIntPipe) id: number) {
    return this.intervalsService.findByUserId(id);
  }

  @Get('/book/id')
  findByBookId(@Body('book_id', ParseIntPipe) id: number) {
    return this.intervalsService.findByBookId(id);
  }

  @Get('/bookWithCon/id')
  findByBookIdWithCon(@Body('book_id', ParseIntPipe) id: number) {
    return this.intervalsService.findByBookwithConId(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIntervalDto: UpdateIntervalDto,
  ) {
    return this.intervalsService.update(id, updateIntervalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.intervalsService.remove(id);
  }
}
