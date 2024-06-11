import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFile } from '../entity/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(UploadFile)
    private fileRepository: Repository<UploadFile>,
  ) {}

  async create(pk: number, fileDatas: Array<Express.Multer.File>) {
    console.log(pk);
    for (let data of fileDatas) {
      const { originalname, filename, path } = data;
      console.log(originalname);
      console.log(filename);
      console.log(path);
      
      //const insertData = this.fileRepository.create({ originalname, filename,  });
    }
  }
}
