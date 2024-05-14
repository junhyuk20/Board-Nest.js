import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid'
import { CreateBoardDto } from './dto/createB-board';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    //const {title,description} = createBoardDto
    const {title,description} = createBoardDto

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((item) => item.id === id);
    
    if (!found) {
      // nest 내장 exception 함수 호출
      throw new NotFoundException(`Can't find Board with id ${id}`);
    } 
    return found;
  }

  deleteBoard(id: string) {
   this.boards = this.boards.filter((item) => item.id !== id) 
  }
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board
  }
}
