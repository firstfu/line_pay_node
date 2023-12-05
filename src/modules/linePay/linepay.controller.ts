/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { R } from 'src/utils/r';
import { LinePayV2Service } from './linepayV2.service';
import { LinePayV3Service } from './linepayV3.service';

@Controller('/linePay')
export class LinePayController {
  constructor(
    private readonly linePayV2Service: LinePayV2Service,
    private readonly linePayV3Service: LinePayV3Service,
  ) {}

  /**
   * linePay購物頁
   * @returns
   */
  @Get('/shop')
  @Render('shop')
  shopping() {
    return { title: 'linePay購物頁' };
  }

  /**
   * 建立付款請求
   * @returns
   */
  @Post('/payments/request')
  async paymentsRequest(@Body() body: any) {
    let rs = null;
    if (process.env.LINEPAY_VERSION === 'v2') {
      rs = await this.linePayV2Service.paymentsRequest(body);
    }
    if (process.env.LINEPAY_VERSION === 'v3') {
      rs = await this.linePayV3Service.paymentsRequest(body);
    }
    return R.success({
      data: rs,
    });
  }

  /**
   * linePay結帳成功
   * @returns
   */
  @Get('/shop/confirm')
  @Render('shop_confirm')
  async shopConfirm(@Query() query: any) {
    const transactionId = query.transactionId;
    const orderId = query?.orderId ?? null;
    let confirmRs = null;
    // 確認付款請求
    if (process.env.LINEPAY_VERSION === 'v2') {
      confirmRs = await this.linePayV2Service.paymentsConfirm(transactionId);
    }
    if (process.env.LINEPAY_VERSION === 'v3') {
      confirmRs = await this.linePayV3Service.paymentsConfirm(
        transactionId,
        orderId,
      );
    }

    return {
      title: 'linePay結帳成功',
      products: [],
      transactionId,
      confirmRs,
    };
  }

  /**
   * linePay結帳取消
   * @returns
   */
  @Get('/shop/cancel')
  @Render('shop_cancel')
  async shopCancel(@Query() query: any) {
    const transactionId = query.transactionId;
    const orderId = query?.orderId ?? null;
    await this.linePayV3Service.paymentsCancel(transactionId, orderId);
    return { title: 'linePay結帳取消', transactionId };
  }

  // =======================================
  /**
   * test
   * @returns
   */
  @Get('/test')
  async test() {
    return 'ok';
  }
}
