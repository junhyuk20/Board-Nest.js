import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardStatus } from '../board-status.enum';
import { CreateBoardDto } from '../dto/create-board';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entity/board.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';
import { UploadFile } from 'src/file/entity/file.entity';


@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(UploadFile)
    private fileRepository: Repository<UploadFile>,
    private dataSource: DataSource,
  ) {}

  // 게시판 생성
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
    files: Array<Express.Multer.File>,
  ) {
    const { title, description } = createBoardDto;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const board = await queryRunner.manager.save(Board, {
        title,
        description,
        status: BoardStatus.PUBLIC,
        user,
      });

      for (let file of files) {
        file['path'] = `/uploads/${file.filename}`;
        await queryRunner.manager.save(UploadFile, {
          originalname: file.originalname,
          filename: file.filename,
          downloadPath: file.path,
          board,
        });
      }

      await queryRunner.commitTransaction();

      return { message: 'Query Success', status: 728 };
    } catch (error) {
      console.log(`등록 쿼리 에러 발생## `, error);
      await queryRunner.rollbackTransaction();
      return { message: 'QueryFailedError', status: 600 };
    } finally {
      await queryRunner.release();
    }
  }

  // 전체 조회
  async getAllBoards(): Promise<Board[]> {
    const getAll = await this.boardRepository.find();
    return getAll;
  }

  // 조회
  /*   async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  } */

  // 삭제
  /*   async deleteBoard(
                    id: number,
                    user: User
                  ): Promise<number> {
    const deleteQuery = await this.boardRepository.delete({ id, user });

    if (deleteQuery.affected === 0) {
      throw new NotFoundException(`요청하신 id:${id} 가 존재하지 않습니다.`);
    }
    return deleteQuery.affected;
  }
 */
  // 수정
  /*   async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board); 

    return board;
  } */

  // 한 사용자의 전체 게시물 조회
  /*   async getUserBoards(user: User): Promise<Board[]> {
    // createQueryBuilder 사용시 로우 쿼리 문 사용 가능, createQueryBuilder() 의 매개변수는 테이블 명칭이다.
    const query = await this.boardRepository.createQueryBuilder('board');

    query.where(`board.userId = :userId`, { userId: user.id }); 

    const boards = await query.getMany();

    return boards;
  }*/
} 
