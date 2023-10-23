import { RequestConfig } from '..';
import { AxiosError, AxiosResponse } from 'axios';
import { notification } from '@/utils/notify';

const exception = {
    request: {
        onFulfilled: async (config: RequestConfig) => {
            return config;
        },
        onRejected: (error: AxiosError<any>) => {
            return error;
        },
    },
    response: {
        onFulfilled: (response: AxiosResponse<any>) => {
            // TODO 其他错误
            return response;
        },
        onRejected: (error: AxiosError<any>) => {
            const { config, response } = error;
            const { url, method, desc, notifyWhenFailure } =
                config as RequestConfig;
            let message = '';
            // @ts-ignore
            switch (response.status) {
                case 400:
                    message = 'Bad Request：客户端发送的请求有误';
                    break;
                case 401:
                    message =
                        'Unauthorized：请求需要身份验证，但没有提供有效的凭据';
                    break;
                case 403:
                    message = 'Forbidden：服务器拒绝访问请求的资源';
                    break;
                case 404:
                    message = 'Not Found：请求的资源不存在';
                    break;
                case 500:
                    message =
                        'Internal Server Error：服务器内部错误，无法完成请求';
                    break;
                default:
                    message = 'Error：未知错误';
            }
            // @ts-ignore
            response.statusText = message;
            // 显示错误消息通知
            if (desc && notifyWhenFailure) {
                notification.error({
                    title: '出错了！',
                    description: `原因：${message}`,
                    // @ts-ignore
                    content: `${method.toUpperCase()}   ${url}`,
                    meta: `接口描述：${desc}`,
                    duration: 3000,
                    keepAliveOnHover: true,
                });
            }
            return Promise.reject(error);
        },
    },
};

export default exception;
