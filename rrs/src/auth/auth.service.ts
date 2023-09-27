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
    const user = await this.userService.findByUsername(username);
    if (!user['status']) {
      throw new NotFoundException('wrong username');
    }
    const userdata = user.data;
    const userId = userdata['userid'];
    if (userdata['password'] != password) {
      throw new UnauthorizedException('wrong password');
    }
    const payload = { sub: userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
