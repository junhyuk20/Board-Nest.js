import { Module } from '@nestjs/common';
import { BoardsController } from './controller/boards.controller';
import { BoardsService } from './service/boards.service';
import { BoardRepository } from './repository/board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

/** 
 * TypeOrmModule 클래스 속 메서드 정의 
 * 
 * 1. forRoot : 각 모듈에서 정의할 필요 없이 전역 모듈에서 설정 시 모든 모듈에서 사용 가능 ex) app.module.ts
 * 2. forFeature : 특정 모듈에서만 사용할 때 ex) boards.module.ts 
 * 3. forRootAsync : 매번 다른 구성으로 여러 번 등록할 수 있는 모듈
*/

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository])
  ],
  controllers: [BoardsController],
  providers: [
    BoardsService,
    BoardRepository,
  ],
})
export class BoardsModule {}
