/**
 * @ Author: firstfu
 * @ Create Time: 2023-11-13 16:49:33
 * @ Description: linePay header
 */

import { createHmac } from 'node:crypto';

/**
 * V2版本
 */
export const headerV2 = {
  'Content-Type': 'application/json',
  'X-LINE-ChannelId': process.env['X_LINE_ChannelId'],
  'X-LINE-ChannelSecret': process.env['X_LINE_ChannelSecret'],
};

/**
 * V3版本
 * @param secret linePay secret
 * @param channelId  linePay channelId
 * @param nonce UUID隨機值
 * @param path url路徑
 * @param body 請求體
 * @returns
 */
export const headerV3 = (secret, channelId, nonce, path, body) => {
  //  HMAC BASE64簽章
  const message = secret + path + body + nonce;
  const encrypt = createHmac('sha256', secret).update(message);
  const signature = encrypt.digest('base64');
  return {
    'Content-Type': 'application/json',
    'X-LINE-ChannelId': channelId,
    'X-LINE-Authorization-Nonce': nonce,
    'X-LINE-Authorization': signature,
  };
};
