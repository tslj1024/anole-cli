import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
// @ts-ignore
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    base: './', //打包路径
    plugins: [
        vue(),
        // gzip压缩 生产环境生成 .gz 文件
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
    ],
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 8080, //启动端口
        hmr: {
            host: '127.0.0.1',
            port: 8080,
        },
        open: true, // 完成后自动打开
        https: false, // 设置 https
        // 设置 https 代理
        proxy: {
            '/api': {
                target: 'http://localhost:8000/mayuan-api',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
            },
        },
    },
    // css:{
    //     preprocessorOptions:{
    //         scss:{
    //             additionalData:'@import "@/assets/style/main.scss";'
    //         }
    //     }
    // },
    build: {
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
});
