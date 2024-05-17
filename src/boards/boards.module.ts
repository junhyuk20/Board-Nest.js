import { Module } from '@nestjs/common';
import { BoardsController } from './controller/boards.controller';
import { BoardsService } from './service/boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';


/** 
 * TypeOrmModule 클래스 속 메서드 정의 
 * 
 * 1. forRoot : 각 모듈에서 정의할 필요 없이 전역 모듈에서 설정 시 모든 모듈에서 사용 가능 ex) app.module.ts
 * 2. forFeature : 특정 모듈에서만 사용할 때 ex) boards.module.ts 
 * 3. forRootAsync : 매번 다른 구성으로 여러 번 등록할 수 있는 모듈
*/

@Module({
  imports: [TypeOrmModule.forFeature([Board])], // Board 엔티티를 현재 모듈의 공급자로 등록
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
