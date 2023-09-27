import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  bookid: number;

  @Column({ unique: true, nullable: false, length: 255 })
  book_name: string;

  @Column({ nullable: false })
  num_of_pages: number;

  @Column({ nullable: false, default: 0 })
  num_of_read_pages: number;
}
