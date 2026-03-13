import { Module } from '@nestjs/common';
import { UploadFileModule } from 'cloudinary/upload-file.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [UploadFileModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
