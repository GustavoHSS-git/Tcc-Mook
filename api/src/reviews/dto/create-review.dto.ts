import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Nota da avaliação',
    example: '5 estrelas',
  })
  @IsString({ message: 'Nota deve ser uma string' })
  @IsNotEmpty({ message: 'Nota é obrigatória' })
  nota: string;

  @ApiProperty({
    description: 'Comentário da avaliação',
    example: 'Excelente livro!',
  })
  @IsString({ message: 'Comentário deve ser uma string' })
  @IsNotEmpty({ message: 'Comentário é obrigatório' })
  comentario: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: '1',
  })
  @IsString({ message: 'ID do usuário deve ser uma string' })
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  userId: number;

  @ApiProperty({
    description: 'ID do livro',
    example: '1',
  })
  @IsString({ message: 'ID do livro deve ser uma string' })
  @IsNotEmpty({ message: 'ID do livro é obrigatório' })
  bookId: number;

  @ApiProperty({
    description: 'URL da imagem',
    example: 'https://example.com/image.jpg',
  })
  @IsString({ message: 'URL da imagem deve ser uma string' })
  image?: string;
}
