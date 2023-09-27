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
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '718653',
      database: 'reading_recomendation_system',
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
