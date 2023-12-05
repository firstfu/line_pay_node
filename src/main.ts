/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //   const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //   app.enableCors();

  //   console.log(join(__dirname, '..', 'views'));

  //   --------- hbs配置 ---------
  //   app.useStaticAssets(join(__dirname, '..', 'public'));
  //   app.setBaseViewsDir(join(__dirname, '..', 'views'));
  //   hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  //   hbs.registerPartials(join(__dirname, '..', 'views/layout'));
  //   app.setViewEngine('hbs');

  //   --------- ejs配置 ---------
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  //   全局攔截器
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除在類上不存在的字段
      whitelist: true,
    }),
  );

  await app.listen(3001);
}
bootstrap();
