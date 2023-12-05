/**
 * @ Author: firstfu
 * @ Create Time: 2023-11-13 17:51:22
 * @ Description: V3版本
 */

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { headerV3 } from './utils/header';

// prisma導入
import {
  CURRENCY,
  PaymentMethod,
  PrismaClient,
  TRANSACTION_STATUS,
} from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class LinePayV3Service {
  /**
   * 建立付款請求
   * @param body
   * @returns
   */
  async paymentsRequest(body) {
    console.log(
      '🚀 ~ file: linepayV3.service.ts:24 ~ LinePayV3Service ~ paymentsRequest ~ body:',
      body,
    );

    try {
      // V3版本
      const version = 'v3';
      //   交易編號
      const orderNo: any = randomUUID();
      //   nonce要相同
      const nonce = randomUUID();
      const path = `/${version}/payments/request`;

      const reqData = {
        // 付款金額
        amount: 3,
        // 貨幣（ISO 4217）支援貨幣：USD、JPY、TWD、THB
        currency: 'TWD',
        // 商家訂單編號: 商家管理的唯一ID
        orderId: orderNo,
        // 訂單明細(商品內容)
        packages: [
          {
            // Package list的唯一ID
            id: 'package001',
            // 一個Package中的商品總價
            amount: 3,
            // Package名稱（or Shop Name）
            name: '禮盒',
            products: [
              {
                // 商品d
                id: 'product001',
                // 商品名
                name: '商品1',
                // 商品圖示的URL
                imageUrl:
                  '',
                // 商品數量
                quantity: 1,
                // 商品價格
                price: 1,
                // 各商品原金額
                // originalPrice: null,
              },
              {
                // 商品d
                id: 'product002',
                // 商品名
                name: '商品2',
                // 商品圖示的URL
                imageUrl:
                  '',
                // 商品數量
                quantity: 2,
                // 商品數量
                price: 1,
                // 各商品原金額
                // originalPrice: null,
              },
            ],
          },
        ],
        redirectUrls: {
          // 使用者授權付款後，跳轉到該商家URL
          confirmUrl: process.env.LINE_CONFIRM_URL,
          //   使用者通過LINE付款頁，取消付款後跳轉到該URL
          cancelUrl: process.env.LINE_CANCEL_URL,
        },
      };

      const headers = headerV3(
        process.env['X_LINE_ChannelSecret'],
        process.env['X_LINE_ChannelId'],
        // nonce要相同
        nonce,
        path,
        JSON.stringify(reqData),
      );

      let rs: any = await axios.post(
        `${process.env['LINE_API_URL']}/${version}/payments/request`,
        reqData,
        {
          headers,
        },
      );
      rs = rs?.data ?? null;
      if (rs?.returnCode !== '0000') {
        throw new Error('returnCode is not 0000');
      }

      const transactionId = rs?.info?.transactionId ?? null;
      console.log(
        '🚀 ~ file: linepayV3.service.ts:108 ~ LinePayV3Service ~ paymentsRequest ~ rs:',
        rs,
      );

      //   交易失敗
      if (!transactionId) {
        throw new Error('transactionId is null');
      }

      const orderRs = await prisma.order.create({
        data: {
          orderNo: orderNo.toString(),
          amount: 3,
          currency: CURRENCY.TWD,
          payment: PaymentMethod.LINE_PAY,
          transactionId: `${transactionId}`,
          orderDetails: {
            createMany: {
              data: [
                {
                  productName: '商品1',
                  quantity: 1,
                  price: 1,
                },
                {
                  productName: '商品2',
                  quantity: 2,
                  price: 1,
                },
              ],
            },
          },
        },
      });

      console.log(
        '🚀 ~ file: linepayV3.service.ts:138 ~ LinePayV3Service ~ paymentsRequest ~ orderRs:',
        orderRs,
      );
      return rs;
    } catch (error) {
      console.log(
        '🚀 ~ file: linepayV3.service.ts:115 ~ LinePayV3Service ~ paymentsRequest ~ error:',
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
  async paymentsConfirm(transactionId, orderId) {
    console.log(
      '🚀 ~ file: linepayV3.service.ts:71 ~ LinePayV3Service ~ paymentsConfirm ~ transactionId:',
      transactionId,
      orderId,
    );

    try {
      // V3版本
      const version = 'v3';
      const path = `/${version}/payments/${transactionId}/confirm`;
      const reqData = {
        // 付款金額
        amount: 3,
        // 貨幣
        currency: 'TWD',
      };

      const nonce = randomUUID();
      const headers = headerV3(
        process.env['X_LINE_ChannelSecret'],
        process.env['X_LINE_ChannelId'],
        nonce,
        path,
        JSON.stringify(reqData),
      );

      let rs: any = await axios.post(
        `${process.env['LINE_API_URL']}/${version}/payments/${transactionId}/confirm`,
        reqData,
        {
          headers,
        },
      );
      rs = rs?.data ?? null;
      console.log(
        '🚀 ~ file: linepayV3.service.ts:223 ~ LinePayV3Service ~ paymentsConfirm ~ rs:',
        JSON.stringify(rs, null, 2),
      );
      if (rs?.returnCode !== '0000') {
        throw new Error('returnCode is not 0000');
      }
      await prisma.order.update({
        data: {
          transactionStatus: TRANSACTION_STATUS.SUCCESS,
        },
        where: {
          transactionId: `${rs?.info?.transactionId}`,
        },
      });

      return rs;
    } catch (error) {
      console.log(
        '🚀 ~ file: linepayV3.service.ts:230 ~ LinePayV3Service ~ paymentsConfirm ~ error:',
        error,
      );

      return null;
    }
  }

  /**
   * linePay結帳取消
   * @param transactionId
   * @param orderId
   */
  async paymentsCancel(transactionId, orderId) {
    const rs = await prisma.order.update({
      data: {
        transactionStatus: TRANSACTION_STATUS.CANCEL,
      },
      where: {
        orderNo: orderId,
      },
    });
    console.log(
      '🚀 ~ file: linepayV3.service.ts:257 ~ LinePayV3Service ~ paymentsCancel ~ rs:',
      rs,
    );
  }
}
