/**
 * @ Author: firstfu
 * @ Create Time: 2023-11-12 02:22:51
 * @ Description: HMAC(消息認證碼)
 */

// const createSignature = (uri, linePayBody) => {
//   const nonce = Date.now();
//   const encrypt = `${config.linepay.secretKey}/${
//     config.linepay.version
//   }${uri}${JSON.stringify(linePayBody)}${nonce}`;
//   const signature = Base64.stringify(
//     hmacSHA256(encrypt, config.linepay.secretKey),
//   );
//   const headers = {
//     'Content-Type': 'application/json',
//     'X-LINE-ChannelId': config.linepay.channelID,
//     'X-LINE-Authorization-Nonce': nonce,
//     'X-LINE-Authorization': signature,
//   };
//   return headers;
// };

// function createLinePayHMAC() {}
