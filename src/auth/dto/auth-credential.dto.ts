import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // 정규식을 이욯안 제한 및 메세지 설정 
    @Matches(/^[a-zA-Z0-9]*$/, {
        message:'password only accepts english and number'
    })
    password: string;
}