import { Injectable } from "@nestjs/common"
import { MulterOptionsFactory } from "@nestjs/platform-express"
import * as path from "path"
import * as fs from 'fs'
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface"
import * as multer from "multer"

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    dirPath: string // 파일 저장 경로 
    
    constructor() {
        this.dirPath = path.join(__dirname,'..','..','..','public','uploads');
        this.createDir()
    }

    createDir() {      
         try {
            console.log(`폴더 생성 경로: `, this.dirPath);
            fs.readdirSync(this.dirPath);
            
        } catch (error) {
            console.log(`uploads 폴더 생성합니다.`)
            fs.mkdirSync(this.dirPath)
        } 
    }

    createMulterOptions(): MulterOptions | Promise<MulterOptions> {
        const dirPath = this.dirPath;
        const options = {
            storage: multer.diskStorage({
                // 파일 저장 위치 설정
                destination(req,file,done) {
                    done(null, dirPath)
                },
                // 파일명 새롭게 설정 
                filename(req, file, done) {
                    const ext = path.extname(file.originalname);
                    const newFileName = path.basename(file.originalname, ext) + new Date().valueOf() + ext;
                    done(null, newFileName);
                } 
            }),
            // 파일 크기 제한
            limits  : { fileSize: 5 * 1024 * 1024},
        }
        return options;
    }
}