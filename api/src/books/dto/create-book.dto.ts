import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Título do livro',
    example: 'Harry Potter e a Pedra Filosofal',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Descrição do livro',
    example:
      'O primeiro livro da série Harry Potter, onde o jovem bruxo descobre seus poderes e enfrenta o mal.',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'ISBN do livro',
    example: '978-3-16-148410-0',
  })
  @IsString({ message: 'ISBN must be a string' })
  @IsNotEmpty({ message: 'ISBN is required' })
  isbn: string;

  @ApiProperty({
    description: 'Quantidade de livros disponíveis',
    example: 10,
  })
  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNotEmpty({ message: 'Quantity must be a number' })
  quantity: number;

  @ApiProperty({
    description: 'ID do autor',
    example: 1,
  })
  @IsNotEmpty({ message: 'Author ID is required' })
  @IsNotEmpty({ message: 'Author ID must be a number' })
  authorId: number;

  @ApiProperty({
    description: 'ID da categoria',
    example: 1,
  })
  @IsNotEmpty({ message: 'Category ID is required' })
  @IsNotEmpty({ message: 'Category ID must be a number' })
  categoryId: number;

  @ApiProperty({
    description: 'URL da imagem do livro',
    example: 'https://example.com/image.jpg',
  })
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;
}
