/**
 * @ Author: firstfu
 * @ Create Time: 2023-04-10 18:35:12
 * @ Description: Rest httpResponse
 */

interface ISuccessResponse {
  code: number;
  message: string;
  data: any;
  error: any;
  traceId?: any;
  timestamp: any;
}

export class R {
  /**
   * 成功回應
   * @param param0
   * @returns
   */
  static success({
    code = 200,
    message = 'success',
    data = null,
  }: Partial<ISuccessResponse>) {
    return {
      code,
      message,
      data,
      //   timestamp: new Date(),
    };
  }

  /**
   * 失敗回應
   * @param param0
   * @returns
   */
  static error({
    code = 500,
    message = 'fail',
    error = null,
    traceId = null,
  }: Partial<ISuccessResponse>) {
    return {
      code,
      message,
      error,
      traceId,
      //   timestamp: new Date()
    };
  }
}
