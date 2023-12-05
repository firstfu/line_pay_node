import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TestModule } from './modules/test/test.module';
import { LinePayModule } from './modules/linePay/linepay.module';

@Module({
  imports: [TestModule, LinePayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
