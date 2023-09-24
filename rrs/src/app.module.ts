import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { IntervalsModule } from './intervals/intervals.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    }),
    UsersModule,
    BooksModule,
    IntervalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
