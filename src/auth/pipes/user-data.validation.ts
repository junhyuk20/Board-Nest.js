import { ArgumentMetadata,  HttpException, HttpStatus, PipeTransform } from "@nestjs/common";

// 사용자 유효성 검사 확대시 사용 계회 그 전 까지는 auth DTO 유효성으로 진행
/* export class UserDataValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { username, password } = value

    if(typeof username !== "string") {
        throw new HttpException(`user name type is only string.`, 701)
    }
    if (username.length < 4 || username.length > 20) {
        throw new HttpException(`user name is 4 ~ 20 word.`, 702);
    }
    if(typeof password !== "string") {
        throw new HttpException(`pass word type is only string.`, 801);
    }
    if(password.length < 4 || password.length > 20) {
        throw new HttpException(`password is 4 ~ 20 word.`,802);
    } 

    
    return value;
  } 
}*/