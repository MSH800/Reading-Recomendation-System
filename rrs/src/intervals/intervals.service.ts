import { Injectable } from '@nestjs/common';
import { CreateIntervalDto } from './dto/create-interval.dto';
import { UpdateIntervalDto } from './dto/update-interval.dto';

@Injectable()
export class IntervalsService {
  create(createIntervalDto: CreateIntervalDto) {
    return 'This action adds a new interval';
  }

  findAll() {
    return `This action returns all intervals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interval`;
  }

  update(id: number, updateIntervalDto: UpdateIntervalDto) {
    return `This action updates a #${id} interval`;
  }

  remove(id: number) {
    return `This action removes a #${id} interval`;
  }
}
