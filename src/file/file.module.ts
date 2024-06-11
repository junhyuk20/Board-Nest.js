import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFile } from './entity/file.entity';
import { FileService } from './service/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  providers: [FileService],
  exports: [FileService,TypeOrmModule],
})
export class FileModule {}
