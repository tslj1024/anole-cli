import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from '@/router';
import { create, NConfigProvider, NButton, NInput } from 'naive-ui';

// 创建vue实例
const app = createApp(App);

// 挂载 pinia
app.use(store);

// 挂载路由
app.use(router);

// 按需引入 NaiveUI
const naive = create({
    components: [NConfigProvider, NButton, NInput],
});
app.use(naive);

// 挂载实例
app.mount('#app');
