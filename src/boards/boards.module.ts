import { Module } from '@nestjs/common';
import { BoardsController } from './controller/boards.controller';
import { BoardsService } from './service/boards.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
