/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/public';
import { Roles } from 'src/decoretors/role';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles('findAllUsers')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles('findById')
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findByID(+id);
  }

  @Roles('findByUsername')
  @Get('/username/u')
  findOneByUsername(@Body('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Roles('findByEmail')
  @Get('/email/e')
  findOne(@Body('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Roles('updateUser')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles('deleteUser')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
