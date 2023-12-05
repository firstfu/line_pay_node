import { TestService } from './test.service';
import { TestController } from './test.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
