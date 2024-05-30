import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config' // config 모듈 사용시 디렉토리 명칭은 무조건 config? 이어야 한다.
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const serverConfig = config.get('server'); // config폴더 안에 정의된 'server' 속성 사용
  
  const port = serverConfig.port;
  
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views')); 
  
  app.setViewEngine('hbs');

  await app.listen(port);
  
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
