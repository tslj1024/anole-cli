import type { AxiosRequestConfig } from 'axios';
import type { RequestConfig } from '..';
import { notification } from '@/utils/notify';
import { AxiosError } from 'axios';

const urlArgsHandler = {
  request: {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { url, method, args, desc, notifyWhenFailure } =
        config as RequestConfig;
      if (args) {
        const lostParams: string[] = [];
        const replacedUrl = url!.replace(/\{([^}]+)\}/g, (res, arg: string) => {
          if (!args[arg]) {
            lostParams.push(arg);
          }
          return args[arg] as string;
        });
        if (lostParams.length) {
          if (desc && notifyWhenFailure) {
            notification.error({
              title: '出错了！',
              description:
                '原因：请求路径中缺少必要的参数，无法组成正确的请求路径',
              // @ts-ignore
              content: `${method.toUpperCase()}   ${url}`,
              meta: `接口描述：${desc}`,
              duration: 3000,
              keepAliveOnHover: true,
            });
          }
          return Promise.reject(new AxiosError('在args中找不到对应的路径参数'));
        }
        return { ...config, url: replacedUrl };
      }
      return config;
    },
  },
};

export default urlArgsHandler;
