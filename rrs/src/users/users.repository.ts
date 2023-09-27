/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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

  public async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.UsersRepository.create(createUserDto);
      if (user) {
        await this.UsersRepository.save(user);
        return { status: 1, data: user, msg: 'user created' };
      }
      return { status: 0, data: null, msg: 'user creation error' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      let user = (await this.findById(id)).data;
      if (user) {
        if (updateUserDto.username) {
          user['username'] = updateUserDto.username;
        }
        if (updateUserDto.email) {
          user['email'] = updateUserDto.email;
        }
        user = await this.UsersRepository.save(user);
        return { status: 1, data: user, msg: 'user updated' };
      }
      return { status: 0, data: null, msg: 'no user found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async deleteUser(id: number) {
    try {
      const user = (await this.findById(id)).data;
      if (user) {
        await this.UsersRepository.remove(user);
        return { status: 1, data: user, msg: 'user deleed' };
      }
      return { status: 0, data: null, msg: 'no user found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findAll() {
    try {
      const users = await this.UsersRepository.find();
      if (users.length) {
        return { status: 1, data: users, msg: 'users found' };
      }
      return { status: 1, data: [], msg: 'no users found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findById(id: number) {
    try {
      const user = await this.UsersRepository.findOneBy({ userid: id });
      if (user) {
        return { status: 1, data: user, msg: 'user found' };
      }
      return { status: 1, data: null, msg: 'no user found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findByUsername(username: string) {
    try {
      const user = await this.UsersRepository.findOne({
        where: { username: username },
      });
      if (user) {
        return { status: 1, data: user, msg: 'user found' };
      }
      return { status: 1, data: null, msg: 'no user found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }

  public async findByEmail(email: string) {
    try {
      const user = await this.UsersRepository.findOne({
        where: { email: email },
      });
      if (user) {
        return { status: 1, data: user, msg: 'user found' };
      }
      return { status: 1, data: null, msg: 'no user found' };
    } catch (err) {
      return { status: 0, data: null, msg: err };
    }
  }
}
