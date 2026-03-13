import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private usuarioService: UsersService,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    if (
      !createReviewDto.nota &&
      !createReviewDto.comentario &&
      !createReviewDto.userId
    ) {
      throw new BadRequestException('Todos os campos são obrigatórios');
    }

    const userId = await this.usuarioService.findOne(createReviewDto.userId);

    if (!userId) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return this.prisma.reviews.create({
      data: {
        nota: createReviewDto.nota,
        comentario: createReviewDto.comentario,
        userId: createReviewDto.userId,
      },
    });
  }

  findAll() {
    return this.prisma.reviews.findMany();
  }

  findOne(id: number) {
    return this.prisma.reviews.findUnique({ where: { id } });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prisma.reviews.update({ where: { id }, data: updateReviewDto });
  }

  remove(id: number) {
    return this.prisma.reviews.delete({ where: { id } });
  }
}
