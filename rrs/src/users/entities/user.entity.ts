import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ nullable: false, unique: true, length: 255 })
  username: string;

  @Column({ nullable: false, unique: true, length: 255 })
  email: string;

  @Column({ nullable: false, length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enumName: 'roles',
    enum: ['user', 'admin'],
    default: 'user',
    nullable: false,
  })
  role: string;
}

export type UserRoleType = 'admin' | 'user';
