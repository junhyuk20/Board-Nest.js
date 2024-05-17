import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardStatus } from '../board-status.enum';
import { CreateBoardDto } from '../dto/create-board';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entity/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board); // 생성한 객체정보를 DB insert 할 때 save 메서드를 사용

    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  /*   getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
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
    const found = this.getBoardById(id); 
   this.boards = this.boards.filter((item) => item.id !== found.id) 
  }
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board
  } */
}
