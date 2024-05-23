import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config' // config 모듈 사용시 디렉토리 명칭은 무조건 config? 이어야 한다.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const serverConfig = config.get('server'); // config폴더 안에 정의된 'server' 속성 사용
  
  const port = serverConfig.port;
  
  await app.listen(port);
  
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
