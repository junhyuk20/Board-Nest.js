import { IsNotEmpty } from "class-validator"

// class-validator, class-transformer 모듈 다운
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}