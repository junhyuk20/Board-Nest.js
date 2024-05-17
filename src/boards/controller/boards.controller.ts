import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from '../service/boards.service';
import { BoardStatus } from '../board-status.enum';
import { CreateBoardDto } from '../dto/create-board';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';
import { Board } from '../entity/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe) // nest 기본 내장된 pipes 사용한 유효성 검사
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  /*  @Get('/')
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post('/creat')
  @UsePipes(ValidationPipe) // nest 기본 내장된 pipes 사용한 유효성 검사
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardService.updateBoardStatus(id, status);
  } */
}