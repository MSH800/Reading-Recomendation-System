import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logInDto';
import { Public } from './public';
import { Roles } from 'src/decoretors/role';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  signIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto.username, logInDto.password);
  }
  
  @Roles('profile')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
