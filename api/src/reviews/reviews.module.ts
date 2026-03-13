import { Module } from '@nestjs/common';
import { UploadFileModule } from 'cloudinary/upload-file.module';
import { UsersModule } from 'src/users/users.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [ReviewsModule, UsersModule, UploadFileModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
