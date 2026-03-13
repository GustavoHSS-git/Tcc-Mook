import { Injectable } from '@nestjs/common';
import { Author } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.prisma.author.create({ data: createAuthorDto });
  }

  findAll(): Promise<Author[]> {
    return this.prisma.author.findMany();
  }

  findOne(id: number): Promise<Author | null> {
    return this.prisma.author.findUnique({ where: { id } });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.prisma.author.update({ where: { id }, data: updateAuthorDto });
  }

  remove(id: number): Promise<Author> {
    return this.prisma.author.delete({ where: { id } });
  }
}
