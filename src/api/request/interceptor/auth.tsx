import { AxiosRequestConfig } from 'axios';
import { RequestConfig } from '..';
import { useUserStore } from '@/store/user';

const authHandler = {
    request: {
        onFulfilled: (config: AxiosRequestConfig) => {
            const userStore = useUserStore();
            const { isAuth, headers } = config as RequestConfig;
            if (isAuth) {
                // 在请求头中加入 token
                // @ts-ignore
                headers.Authorization = userStore.getToken;
            }
            return config;
        },
    },
};

export default authHandler;
