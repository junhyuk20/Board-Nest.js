import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { BoardsService } from 'src/boards/service/boards.service';

@Controller()
export class IndexController {
    constructor(private boardService: BoardsService) {};

    @Get('/')
    async indexPage(@Res() res: Response) {
        const boards = await this.boardService.getAllBoards();
       
        res.render('index', { boardDatas: JSON.stringify(boards) });
    }
}
