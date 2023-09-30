import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ name: 'isUser', async: true })
@Injectable()
export class isUser implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(user_id: number): Promise<boolean> {
    const user = await this.usersService.findByID(user_id);
    if (!user.status) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'A valid user_id must be entered';
  }
}
