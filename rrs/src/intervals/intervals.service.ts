import { Injectable } from '@nestjs/common';
import { CreateIntervalDto } from './dto/create-interval.dto';
import { UpdateIntervalDto } from './dto/update-interval.dto';
import { IntervalRepository } from './interval.repository';

@Injectable()
export class IntervalsService {
  constructor(private readonly intervalRepository: IntervalRepository) {}
  create(createIntervalDto: CreateIntervalDto,req) {
    if (req['user'].userid != createIntervalDto.user_id){
      return {
        status: 0,
        data: null,
        msg: 'user in token must match user in params',
      };
    }
    if (createIntervalDto['end_page'] < createIntervalDto['start_page']) {
      return {
        status: 0,
        data: null,
        msg: 'end_page can not be < start_page',
      };
    }
    return this.intervalRepository.createInterval(createIntervalDto);
  }

  findAll() {
    return this.intervalRepository.findAll();
  }

  findById(id: number) {
    return this.intervalRepository.findById(id);
  }

  findByUserId(id: number) {
    return this.intervalRepository.findByUserId(id);
  }

  findByBookId(id: number) {
    return this.intervalRepository.findByBookId(id);
  }

  findByBookwithConId(id: number) {
    return this.intervalRepository.findByBookIdWithCon(id);
  }

  update(id: number, updateIntervalDto: UpdateIntervalDto,req) {
    return this.intervalRepository.updateInterval(id, updateIntervalDto,req);
  }

  remove(id: number,req) {
    return this.intervalRepository.deleteInterval(id,req);
  }
}
