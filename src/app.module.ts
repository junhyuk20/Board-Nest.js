import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/db/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { IndexController } from './index/index.controller';
import { FileModule } from './file/file.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardsModule,
    AuthModule,
    FileModule
  ],
  controllers: [IndexController],
  providers: [],
})
export class AppModule {}
