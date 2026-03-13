import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { UploadService } from 'cloudinary/upload-file.service';
import { PrismaService } from 'database/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(
    createBookDto: CreateBookDto,
    file: Express.Multer.File,
  ): Promise<Book> {
    let imageUrl: string | undefined;
    if (file) {
      const result = await this.uploadService.uploadImage(file);
      imageUrl = result.url;
    }

    return this.prisma.book.create({
      data: {
        title: createBookDto.title,
        description: createBookDto.description,
        isbn: createBookDto.isbn,
        quantity: Number(createBookDto.quantity),
        authorId: Number(createBookDto.authorId),
        categoryId: Number(createBookDto.categoryId),
        imageUrl,
      },
    });
  }

  findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  findOne(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id } });
  }

  update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  remove(id: number): Promise<Book> {
    return this.prisma.book.delete({ where: { id } });
  }
}
