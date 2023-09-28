import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'intervals' })
@Index(['user_id', 'book_id', 'start_page', 'end_page'], { unique: true })
export class Interval {
  @PrimaryGeneratedColumn()
  interval_id: number;

  @Column()
  user_id: number;

  @Column()
  book_id: number;

  @Column()
  start_page: number;

  @Column()
  end_page: number;
}
