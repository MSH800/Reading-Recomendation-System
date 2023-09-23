import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntervalsService } from './intervals.service';
import { CreateIntervalDto } from './dto/create-interval.dto';
import { UpdateIntervalDto } from './dto/update-interval.dto';

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
  findOne(@Param('id') id: string) {
    return this.intervalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntervalDto: UpdateIntervalDto) {
    return this.intervalsService.update(+id, updateIntervalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intervalsService.remove(+id);
  }
}
