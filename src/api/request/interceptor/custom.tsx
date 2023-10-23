import { RequestConfig } from '@/api/request';
import { AxiosResponse, AxiosError } from 'axios';

const custom = {
    request: {
        onFulfilled: async (config: RequestConfig) => {
            return config;
        },
        onRejected: (error: AxiosError<any>) => {
            return Promise.reject(error);
        },
    },
    response: {
        onFulfilled: (response: AxiosResponse<any>) => {
            return response;
        },
        onRejected: (error: AxiosError<any>) => {
            return Promise.reject(error);
        },
    },
};

/*
    自定义拦截器，用于放置一些其他自定义拦截内容
 */
export default custom;
