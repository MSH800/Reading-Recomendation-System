import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { IntervalsModule } from './intervals/intervals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthModule } from './auth/auth.module';
import { isUser } from './validations/isUser';
import { isBook } from './validations/isBook';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_UN,
      password: process.env.DB_PS,
      database: process.env.DB_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    BooksModule,
    IntervalsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    isUser,
    isBook,

    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
