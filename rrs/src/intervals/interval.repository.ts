/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interval } from './entities/interval.entity';
import { CreateIntervalDto } from './dto/create-interval.dto';
import { UpdateIntervalDto } from './dto/update-interval.dto';
import { BooksService } from 'src/books/books.service';
import { Inject, forwardRef } from '@nestjs/common';

export class IntervalRepository extends Repository<Interval> {
  constructor(
    @InjectRepository(Interval)
    private readonly IntervalsRepository: Repository<Interval>,
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
  ) {
    super(
      IntervalsRepository.target,
      IntervalsRepository.manager,
      IntervalsRepository.queryRunner,
    );
  }

  public async createInterval(createIntervalDto: CreateIntervalDto) {
    try {
      let interval = await this.IntervalsRepository.create(createIntervalDto);
      if (interval) {
        const book = await this.booksService.findOne(interval.book_id);
        if (book.data.num_of_pages < interval.start_page) {
          return {
            status: 0,
            data: null,
            msg: 'start_page can not be > book num_of_pages',
          };
        }
        if (book.data.num_of_pages < interval.end_page) {
          return {
            status: 0,
            data: null,
            msg: 'end_page can not be > book num_of_pages',
          };
        }
        interval = await this.IntervalsRepository.save(interval);
        if (interval) {
          const intervals = (await this.findByBookIdWithCon(interval.book_id))
            .data;
          this.booksService.updateByInterval(interval.book_id, intervals);
          return { status: 1, data: interval, msg: 'interval created' };
        }
      }
      return { status: 0, data: null, msg: 'interval creation error' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findAll() {
    try {
      const intervals = await this.IntervalsRepository.find();
      if (intervals.length) {
        return { status: 1, data: intervals, msg: 'intervals found' };
      }
      return { status: 0, data: null, msg: 'no intervals found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findById(id: number) {
    try {
      const interval = await this.IntervalsRepository.findOneBy({
        interval_id: id,
      });
      if (interval) {
        return { status: 1, data: interval, msg: 'interval found' };
      }
      return { status: 0, data: null, msg: 'no interval found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findByUserId(id: number) {
    try {
      const intervals = await this.IntervalsRepository.find({
        where: { user_id: id },
      });
      if (intervals.length) {
        return { status: 1, data: intervals, msg: 'interval found' };
      }
      return { status: 0, data: null, msg: 'no intervals found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findByBookId(id: number) {
    try {
      const intervals = await this.IntervalsRepository.find({
        where: { book_id: id },
      });
      if (intervals.length) {
        return { status: 1, data: intervals, msg: 'intervals found' };
      }
      return { status: 0, data: null, msg: 'no intervals found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findByBookIdWithCon(id: number) {
    try {
      //select  start_page ,max(end_page) As end_page from intervals where book_id=3  group by  start_page;
      const intervals = await this.IntervalsRepository.createQueryBuilder(
        'intervals',
      )
        .select(' i.start_page ,max(i.end_page) AS end_page')
        .from(Interval, 'i')
        .where('i.book_id = :id', { id: id })
        .groupBy('i.start_page')
        .orderBy('i.start_page', 'ASC')
        .execute();
      if (intervals.length) {
        return { status: 1, data: intervals, msg: 'intervals found' };
      }
      return { status: 0, data: null, msg: 'no intervals found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async updateInterval(
    id: number,
    updateIntervalDto: UpdateIntervalDto,
    req,
  ) {
    try {
      let interval = (await this.findById(id)).data;
      if (interval) {
        if (req['user'].userid != interval.user_id) {
          return {
            status: 0,
            data: null,
            msg: 'user in token must match user in params',
          };
        }
        if (updateIntervalDto.start_page) {
          interval['start_page'] = updateIntervalDto.start_page;
        }
        if (updateIntervalDto.end_page) {
          interval['end_page'] = updateIntervalDto.end_page;
        }
        if (updateIntervalDto.book_id) {
          interval['book_id'] = updateIntervalDto.book_id;
        }
        if (interval['end_page'] < interval['start_page']) {
          return {
            status: 0,
            data: null,
            msg: 'end_page cannot be < start_page',
          };
        }
        const book = await this.booksService.findOne(interval.book_id);
        if (book.data.num_of_pages < interval.start_page) {
          return {
            status: 0,
            data: null,
            msg: 'start_page can not be > book num_of_pages',
          };
        }
        if (book.data.num_of_pages < interval.end_page) {
          return {
            status: 0,
            data: null,
            msg: 'end_page can not be > book num_of_pages',
          };
        }
        interval = await this.IntervalsRepository.save(interval);
        if (interval) {
          const intervals = (await this.findByBookIdWithCon(interval.book_id))
            .data;
          this.booksService.updateByInterval(interval.book_id, intervals);
          return { status: 1, data: interval, msg: 'interval updated' };
        }
      }
      return { status: 0, data: null, msg: 'no interval found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async deleteInterval(id: number, req) {
    try {
      let interval = (await this.findById(id)).data;
      if (interval) {
        if (req['user'].userid != interval.user_id) {
          return {
            status: 0,
            data: null,
            msg: 'user in token must match user in params',
          };
        }
        interval = await this.IntervalsRepository.remove(interval);
        if (interval) {
          const intervals = (await this.findByBookIdWithCon(interval.book_id))
            .data;
          this.booksService.updateByInterval(interval.book_id, intervals);
          return { status: 1, data: interval, msg: 'interval deleted' };
        }
      }
      return { status: 0, data: null, msg: 'no interval found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }
}
