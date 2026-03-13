import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString({ message: 'Nota deve ser uma string' })
  @IsNotEmpty({ message: 'Nota é obrigatória' })
  nota: string;

  @IsString({ message: 'Comentário deve ser uma string' })
  @IsNotEmpty({ message: 'Comentário é obrigatório' })
  comentario: string;

  @IsString({ message: 'ID do usuário deve ser uma string' })
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  usuarioId: number;
}
