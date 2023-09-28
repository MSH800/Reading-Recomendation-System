import { Module, forwardRef } from '@nestjs/common';
import { IntervalsService } from './intervals.service';
import { IntervalsController } from './intervals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interval } from './entities/interval.entity';
import { IntervalRepository } from './interval.repository';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Interval]), BooksModule],
  controllers: [IntervalsController],
  providers: [IntervalsService, IntervalRepository],
})
export class IntervalsModule {}
