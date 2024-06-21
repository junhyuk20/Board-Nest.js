import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFile } from '../entity/file.entity';
import { Repository } from 'typeorm';
import { Board } from 'src/boards/entity/board.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(UploadFile)
    private fileRepository: Repository<UploadFile>,
  ) {}

  async create(board: Board, fileDatas: Array<Express.Multer.File>) {
    
    for (let data of fileDatas) {
      data['path'] = `/uploads/${data.filename}`;

      const insertData = this.fileRepository.create({
        originalname: data.originalname,
        filename: data.filename,
        downloadPath: data.path,
        board,
      });

      await this.fileRepository.save(insertData);
    } 

    
  }
}
