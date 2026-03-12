import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'nome deve ser uma string' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'email deve ser um email válido' })
  @IsNotEmpty({ message: 'email é obrigatório' })
  email: string;

  @IsString({ message: 'login deve ser uma string' })
  @IsNotEmpty({ message: 'login é obrigatório' })
  login: string;

  @IsString({ message: 'senha deve ser uma string' })
  @MinLength(6, { message: 'senha deve ter pelo menos 6 caracteres' })
  senha: string;

  @IsBoolean({ message: 'admin deve ser um valor booleano' })
  admin: boolean;
}
