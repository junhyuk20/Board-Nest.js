import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from '../service/boards.service';
import { BoardStatus } from '../board-status.enum';
import { CreateBoardDto } from '../dto/create-board';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';
import { Board } from '../entity/board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  // 생성
  @Post()
  @UsePipes(ValidationPipe) // nest 기본 내장된 pipes 사용한 유효성 검사
  createBoard(@Body() createBoardDto: CreateBoardDto, 
              @GetUser() user: User
            ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  // 조회
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  //삭제
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.boardService.deleteBoard(id);
  }

  // 수정
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) : Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }

  // 모두 조회 
  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  
}