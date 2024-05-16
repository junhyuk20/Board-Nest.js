import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

// 자체제작 파이프를 이용한 유효성 체크  
export class BoardStatusValidationPipe implements PipeTransform {
    
    readonly StatusOptions: string[] = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC,
    ]

    private isStatusValid(status: string): number {
        const index: number = this.StatusOptions.indexOf(status);
        return index;
    }
    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if (this.isStatusValid(value) === -1 ) {
            throw new BadRequestException(`${value} isn't in the status options.`)
        }
            return value;
    }
}