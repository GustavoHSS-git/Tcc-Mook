import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({
    example: 1,
    description: 'ID do usuário que pegou o livro',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 5,
    description: 'ID do livro emprestado',
  })
  @IsInt()
  bookId: number;

  @ApiProperty({
    example: '2026-03-20T00:00:00.000Z',
    required: false,
    description: 'Data prevista de devolução',
  })
  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @ApiProperty({
    example: false,
    required: false,
    description: 'Indica se o livro já foi devolvido',
  })
  @IsOptional()
  @IsBoolean()
  returned?: boolean;
}
