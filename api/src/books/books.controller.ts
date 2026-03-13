import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo livro' })
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.booksService.create(createBookDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os livros' })
  findAll(): any {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um livro pelo ID' })
  findOne(@Param('id') id: string): any {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um livro pelo ID' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): any {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um livro pelo ID' })
  remove(@Param('id') id: string): any {
    return this.booksService.remove(+id);
  }
}
