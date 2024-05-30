import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class IndexController {
    @Get('/')
    indexPage(@Res() res: Response) {
        res.render('index')
    }
}
