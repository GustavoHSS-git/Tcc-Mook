import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  @IsString({ message: 'nome deve ser uma string' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@example.com',
  })
  @IsEmail({}, { message: 'email deve ser um email válido' })
  @IsNotEmpty({ message: 'email é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'Login do usuário',
    example: 'joao.silva',
  })
  @IsString({ message: 'login deve ser uma string' })
  @IsNotEmpty({ message: 'login é obrigatório' })
  login: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsString({ message: 'senha deve ser uma string' })
  @MinLength(6, { message: 'senha deve ter pelo menos 6 caracteres' })
  senha: string;

  @ApiProperty({
    description: 'Indica se o usuário é administrador',
    example: false,
  })
  @IsBoolean({ message: 'admin deve ser um valor booleano' })
  admin: boolean;
}
