import { DataSource, Repository } from "typeorm";
import { Board } from "../entity/board.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());  
  }
}

/**
 *  Repository 클래스 정의 
 * 
 *  1. 쿼리를 날릴 수 있는 함수들의 정의 되어 있다. Find entities, insert, update, delete, etc.
 *  2. Repository를 상속 받았으므로 Repository 클래스안에 생성자가 정의되어 있다면 반드시 구현해 줘야 된다. 해당 부분 아홉번째 줄
 */

/**
 *  DataSource 클래스 정의
 * 
 *  1.DataSource는 특정 데이터베이스에 대한 사전 정의된 연결 구성입니다. 즉 DB랑 연결해주는 클래스
 */