/**
 * @ Author: firstfu
 * @ Create Time: 2023-11-10 13:57:33
 * @ Description: linePay
 */

/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { LinePayController } from './linepay.controller';
import { LinePayV2Service } from './linepayV2.service';
import { LinePayV3Service } from './linepayV3.service';

@Module({
  imports: [],
  controllers: [LinePayController],
  providers: [LinePayV2Service, LinePayV3Service],
})
export class LinePayModule {}
