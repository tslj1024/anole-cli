import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import urlArgs from './interceptor/url-args';

const instance = axios.create({
    timeout: 10000,
    baseURL: '/api',
});
// @ts-ignore
instance.interceptors.request.use(urlArgs.request.onFulfilled, undefined);

export interface ResultFormat<T = any> {
    data: null | T;
    err: AxiosError | null;
    response: AxiosResponse<T> | null;
}

export interface RequestConfig extends AxiosRequestConfig {
    args?: Record<string, any>;
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
    ): (
        requestConfig?: Partial<RequestConfig>,
    ) => Promise<ResultFormat<Payload>>;

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
        requestConfig: Partial<
            Omit<RequestConfig, 'data' | 'params' | 'args'>
        > &
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
        // 统一处理返回类型
        try {
            const response: AxiosResponse<T, RequestConfig> =
                await instance.request<T>(mergedConfig);
            const { data } = response;
            return { err: null, data, response };
        } catch (err: any) {
            return { err, data: null, response: null };
        }
    };
};

export default makeRequest;
