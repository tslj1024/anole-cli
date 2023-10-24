import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import urlArgs from './interceptor/url-args';
import authHandler from './interceptor/auth';
import limiter from './interceptor/limit-flow';
import exception from './interceptor/exception';
import custom from '@/api/request/interceptor/custom';

const instance = axios.create({
  timeout: 10000,
  baseURL: '/api',
});
// 前置拦截 => 后添加先执行
// @ts-ignore 前置限流
instance.interceptors.request.use(limiter.request.onFulfilled, undefined);
// @ts-ignore 加权限
instance.interceptors.request.use(authHandler.request.onFulfilled, undefined);
// @ts-ignore args参数检查
instance.interceptors.request.use(urlArgs.request.onFulfilled, undefined);
// @ts-ignore 自定义拦截器
instance.interceptors.request.use(
  // @ts-ignore
  custom.request.onFulfilled,
  custom.request.onRejected,
);

// 后置拦截 => 顺序执行
// 自定义拦截器
instance.interceptors.response.use(
  custom.response.onFulfilled,
  custom.response.onRejected,
);
// 接口异常拦截器
instance.interceptors.response.use(
  exception.response.onFulfilled,
  exception.response.onRejected,
);
// 后置限流
instance.interceptors.response.use(
  limiter.response.onFulfilled,
  limiter.response.onRejected,
);

export interface ResultFormat<T = any> {
  data: null | T;
  // err: AxiosError | null;
  response: AxiosResponse<T> | null;
}

export interface RequestConfig extends AxiosRequestConfig {
  args?: Record<string, any>;
  isAuth?: boolean; // 手动控制要不要携带 token
  limit?: number; // 限流
  desc?: string; // 功能描述
  notifyWhenSuccess?: boolean; // 手动开启/关闭成功后通知
  notifyWhenFailure?: boolean; // 手动开启/关闭失败后通知
}

/**
 * 允许定义四个可选的泛型参数：
 *    Payload: 用于定义响应结果的数据类型
 *    Data：用于定义data的数据类型
 *    Params：用于定义parmas的数据类型
 *    Args：用于定义存放路径参数的属性args的数据类型
 */
interface MakeRequest {
  <Payload = any>(
    config: RequestConfig,
  ): (requestConfig?: Partial<RequestConfig>) => Promise<ResultFormat<Payload>>;

  <Payload, Data>(
    config: RequestConfig,
  ): (
    requestConfig: Partial<Omit<RequestConfig, 'data'>> & { data: Data },
  ) => Promise<ResultFormat<Payload>>;

  <Payload, Data, Params>(
    config: RequestConfig,
  ): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) & {
        params: Params;
      },
  ) => Promise<ResultFormat<Payload>>;

  <Payload, Data, Params, Args>(
    config: RequestConfig,
  ): (
    requestConfig: Partial<Omit<RequestConfig, 'data' | 'params' | 'args'>> &
      (Data extends undefined ? { data?: undefined } : { data: Data }) &
      (Params extends undefined
        ? { params?: undefined }
        : { params: Params }) & {
        args: Args;
      },
  ) => Promise<ResultFormat<Payload>>;
}

const makeRequest: MakeRequest = <T>(config: RequestConfig) => {
  return async (requestConfig?: Partial<RequestConfig>) => {
    // 合并在service中定义的option和调用时从外部传入的option
    const mergedConfig: RequestConfig = {
      ...config,
      ...requestConfig,
      headers: {
        ...config.headers,
        ...requestConfig?.headers,
      },
    };
    const response: AxiosResponse<T, RequestConfig> =
      await instance.request<T>(mergedConfig);
    const { data } = response;
    return { data, response };
    // 这样就可以通过判断 data 是否有效，判断此次接口请求是否成功
    // 如果成功：data 就是返回的数据
    // 如果未成功：response 就是返回的错误信息
  };
};

export default makeRequest;
