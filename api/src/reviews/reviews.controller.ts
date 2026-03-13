import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova avaliação' })
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.reviewsService.create(createReviewDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as avaliações' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma avaliação pelo ID' })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma avaliação pelo ID' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma avaliação pelo ID' })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
