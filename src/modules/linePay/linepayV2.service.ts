/**
 * @ Author: firstfu
 * @ Create Time: 2023-11-13 17:51:22
 * @ Description: V2版本
 */

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { headerV2 } from './utils/header';

@Injectable()
export class LinePayV2Service {
  /**
   * 建立付款請求
   * @param body
   * @returns
   */
  async paymentsRequest(body) {
    console.log(
      '🚀 ~ file: linepay.service.ts:13 ~ LinePayService ~ paymentsRequest ~ body:',
      body,
    );

    try {
      // v2: 測試環境
      const version = 'v2';
      const orderNo = randomUUID();
      const reqData = {
        amount: 1,
        currency: 'TWD',
        productName: '商品1',
        productImageUrl:
          'https://static.iyp.tw/41612/products/photooriginal-2218491-nPqc6.jpg',
        confirmUrl: process.env.LINE_CONFIRM_URL,
        orderId: orderNo,
      };

      let rs = await axios.post(
        `${process.env['LINE_API_URL']}/${version}/payments/request`,
        reqData,
        {
          headers: headerV2,
        },
      );
      rs = rs?.data ?? null;
      console.log(
        '🚀 ~ file: linepay.service.ts:44 ~ LinePayService ~ paymentsRequest ~ rs:',
        rs,
      );
      return rs;
    } catch (error) {
      console.log(
        '🚀 ~ file: linepay.service.ts:39 ~ LinePayService ~ paymentsRequest ~ error',
        error,
      );
      return null;
    }
  }

  /**
   * 確認付款請求
   * @param transactionId 交易編號
   * @returns
   */
  async paymentsConfirm(transactionId) {
    console.log(
      '🚀 ~ file: linepay.service.ts:68 ~ LinePayService ~ paymentsConfirm ~ transactionId:',
      transactionId,
    );

    try {
      // v2: 測試環境
      const version = 'v2';
      const reqData = {
        // 付款金額
        amount: 1,
        // 貨幣
        currency: 'TWD',
      };
      let rs = await axios.post(
        `${process.env['LINE_API_URL']}/${version}/payments/${transactionId}/confirm`,
        reqData,
        {
          headers: headerV2,
        },
      );
      rs = rs?.data ?? null;
      console.log(
        '🚀 ~ file: linepay.service.ts:91 ~ LinePayService ~ paymentsConfirm ~ rs:',
        JSON.stringify(rs, null, 2),
      );

      return rs;
    } catch (error) {
      console.log(
        '🚀 ~ file: linepay.service.ts:98 ~ LinePayService ~ paymentsConfirm ~ error:',
        error,
      );
      return null;
    }
  }
}
