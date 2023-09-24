import { Module } from '@nestjs/common';
import { IntervalsService } from './intervals.service';
import { IntervalsController } from './intervals.controller';

@Module({
  controllers: [IntervalsController],
  providers: [IntervalsService],
})
export class IntervalsModule {}