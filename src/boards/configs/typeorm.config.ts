import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.TYPE || dbConfig.type,
  host: process.env.HOST || dbConfig.host,
  port: process.env.PORT || dbConfig.port,
  username: process.env.RD_USERNAME || dbConfig.username, // process.env.USERNAME 으로 불러오면 개발자가 정의한 이름이 아닌 현재 컴퓨터의 소유자를 가지고옴... 
  password: process.env.PASSWORD || dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js.ts}'],
  synchronize: dbConfig.synchronize,
  autoLoadEntities: true, // entity를 정의한 클래스와 자동 연결
};