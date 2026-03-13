import { Injectable } from '@nestjs/common';
import { Loan } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  create(createLoanDto: CreateLoanDto): Promise<Loan> {
    return this.prisma.loan.create({
      data: createLoanDto,
    });
  }

  findAll(): Promise<Loan[]> {
    return this.prisma.loan.findMany();
  }

  findOne(id: number) {
    return this.prisma.loan.findUnique({
      where: { id },
    });
  }

  update(id: number, updateLoanDto: UpdateLoanDto): Promise<Loan> {
    return this.prisma.loan.update({
      where: { id },
      data: updateLoanDto,
    });
  }

  remove(id: number): Promise<Loan> {
    return this.prisma.loan.delete({
      where: { id },
    });
  }
}
