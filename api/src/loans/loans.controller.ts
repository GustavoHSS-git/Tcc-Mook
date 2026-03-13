import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Loan } from '@prisma/client';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoansService } from './loans.service';

@ApiTags('Loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo empréstimo' })
  create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os empréstimos' })
  findAll(): Promise<Loan[]> {
    return this.loansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um empréstimo pelo ID' })
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um empréstimo pelo ID' })
  update(
    @Param('id') id: string,
    @Body() updateLoanDto: UpdateLoanDto,
  ): Promise<Loan> {
    return this.loansService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um empréstimo pelo ID' })
  remove(@Param('id') id: string): Promise<Loan> {
    return this.loansService.remove(+id);
  }
}
