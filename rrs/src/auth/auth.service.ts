import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async logIn(username: string, password: string) {
    let user = await this.userService.findByUsername(username);
    if (!user['status']) {
      throw new NotFoundException('wrong username');
    }
    user = user.data;
    const userId = user['userid'];
    if (user['password'] != password) {
      throw new UnauthorizedException('wrong password');
    }
    console.log(user);
    const payload = { sub: userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
