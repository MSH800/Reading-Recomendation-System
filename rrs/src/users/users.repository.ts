/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private UsersRepository: Repository<User>,
  ) {
    super(
      UsersRepository.target,
      UsersRepository.manager,
      UsersRepository.queryRunner,
    );
  }

  public async createUser(user: any) {
    try {
      return await this.UsersRepository.save(user);
    } catch (err) {
      return { status: 0, data: err };
    }
  }

  public async updateUser(id: number, user: any) {
    try {
      user = await this.UsersRepository.update({ userid: id }, user);
      if (user.affected) {
        return { status: 1, data: user };
      }
      return { status: 0, data: 'user not found' };
    } catch (err) {
      return { status: 0, data: err };
    }
  }

  public async deleteUser(id: number) {
    try {
      const user = await this.UsersRepository.delete({ userid: id });
      if (user.affected) {
        return { status: 1, data: user };
      }
      return { status: 0, data: 'user not found' };
    } catch (err) {
      return { status: 0, data: err };
    }
  }

  public async findAll() {
    try {
      const users = await this.UsersRepository.find();
      if (users) {
        return { status: 1, data: users };
      }
      return { status: 0, data: 'user not found' };
    } catch (err) {
      return { status: 0, data: err };
    }
  }

  public async findById(id: number) {
    try {
      const user = await this.UsersRepository.findOneBy({ userid: id });
      if (user) {
        return { status: 1, data: user };
      }
      return { status: 0, data: 'user not found' };
    } catch (err) {
      return { status: 0, data: err };
    }
  }

  public async findByUsername(username: string) {
    try {
      const user = await this.UsersRepository.findOne({
        where: { username: username },
      });
      if (user) {
        return { status: 1, data: user };
      }
      return { status: 0, data: 'user not found' };
    } catch (err) {
      return { status: 0, data: err };
    }
  }

  public async findByEmail(email: string) {
    try {
      const user = await this.UsersRepository.findOne({
        where: { email: email },
      });
      if (user) {
        return { status: 1, data: user };
      }
      return { status: 0, data: 'user not found' };
    } catch (err) {
      return { status: 0, data: err };
    }
  }
}
