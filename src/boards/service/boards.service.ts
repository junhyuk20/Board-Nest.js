import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardStatus } from '../board-status.enum';
import { CreateBoardDto } from '../dto/create-board';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entity/board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  // 생성
  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.boardRepository.save(board); // 생성한 객체정보를 DB insert 할 때 save 메서드를 사용

    return board;
  }

  // 조회
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  // 삭제
  async deleteBoard(id: number): Promise<number> {
    const deleteQuery = await this.boardRepository.delete({ id });
    

    if (deleteQuery.affected === 0) {
      throw new NotFoundException(`요청하신 id:${id} 가 존재하지 않습니다.`);
    }
    return deleteQuery.affected;
  }

  // 수정 
 async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
   
    board.status = status;
    await this.boardRepository.save(board);
    
    return board
 }

 // 전체 조회 
 async getAllBoards():Promise<Board[]> {
  const getAll = await this.boardRepository.find()
  return getAll;
 }
}
