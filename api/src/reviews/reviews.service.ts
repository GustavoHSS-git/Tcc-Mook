import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  create(createReviewDto: CreateReviewDto) {
    // Ensure 'user' property is included as required by ReviewsCreateInput
    return this.prisma.reviews.create({
      data: {
        ...createReviewDto,
        user: { connect: { id: createReviewDto.usuarioId } },
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
