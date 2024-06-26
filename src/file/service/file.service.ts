import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    let queryResult = null;
    let result = 0;

     for (let fileData of fileDatas) {
       fileData['path'] = `/uploads/${fileData.filename}`;

       queryResult = await this.fileRepository.save({
         originalname: fileData.originalname,
         filename: fileData.filename,
         downloadPath: fileData.path,
         board,
         //boardId:'1', 예외발생 코드
       });

       queryResult.id !== undefined ? (result = 1) : '';
     }   
    return result;
    
  }
}
