import { RequestConfig } from '..';
import { AxiosError, AxiosResponse } from 'axios';

type ResolveFn = (value: unknown) => void;

const records: Record<string, { count: number; queue: ResolveFn[] }> = {};

const generateKey = (config: RequestConfig) => `${config.url}-${config.method}`;

const limiter = {
  request: {
    onFulfilled: async (config: RequestConfig) => {
      const { limit } = config;
      // 如果limit被定义，则执行限流逻辑
      if (typeof limit === 'number') {
        const key = generateKey(config);
        if (!records[key]) {
          records[key] = {
            count: 0,
            queue: [],
          };
        }
        const record = records[key];
        record.count += 1;
        if (record.count <= limit) {
          return config;
        }
        // 把该请求通过await阻塞存储在queue队列中
        await new Promise((resolve) => {
          record.queue.push(resolve);
        });
        return config;
      }
      return config;
    },
  },
  response: {
    onFulfilled: (response: AxiosResponse<any>) => {
      const config = response.config as RequestConfig;
      const { limit } = config;
      if (typeof limit === 'number') {
        const key = generateKey(config);
        const record = records[key];
        record.count -= 1;
        if (record.queue.length) {
          record.queue.shift()!(null);
        }
      }
      return response;
    },
    // 这里我做成了无论什么情况，都会只返回数据，而不在 makeRequest 中抛出异常，通用的接口异常都会在前面的拦截器中处理
    onRejected: (error: AxiosError<any>) => {
      const config = error.config as RequestConfig;
      const { limit } = config as RequestConfig;
      if (typeof limit === 'number') {
        const key = generateKey(config);
        const record = records[key];
        record.count -= 1;
        if (record.queue.length) {
          record.queue.shift()!(null);
        }
      }
      return error;
    },
  },
};

export default limiter;
