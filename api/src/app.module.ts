import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'database/prisma.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    ReviewsModule,
    AuthorModule,
    CategoryModule,
    BooksModule,
    LoansModule,
  ],
})
export class AppModule {}
