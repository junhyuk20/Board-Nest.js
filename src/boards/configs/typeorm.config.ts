import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'krsoft',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js.ts}'],
  synchronize: true,
  autoLoadEntities:true, // entity를 정의한 클래스와 자동 연결
};