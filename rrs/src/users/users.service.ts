import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findByID(id: number) {
    return this.userRepository.findById(id);
  }

  findByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  update(id: number, updateUserDto: UpdateUserDto, req) {
    if (req['user'].userid != id) {
      return {
        status: 0,
        data: null,
        msg: 'user in token must match user in params',
      };
    }
    return this.userRepository.updateUser(id, updateUserDto);
  }

  remove(id: number, req) {
    if (req['user'].userid != id) {
      return {
        status: 0,
        data: null,
        msg: 'user in token must match user in params',
      };
    }
    return this.userRepository.deleteUser(id);
  }
}
