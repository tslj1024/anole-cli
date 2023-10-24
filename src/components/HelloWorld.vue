<script setup lang="ts">
import { ref } from 'vue';
import { useNotification } from 'naive-ui';
import apis from '@/api';

const notification = useNotification();

defineProps<{ msg: string }>();

const count = ref(0);
const testnotify = () => {
  notification.info({
    title: '叮咚！',
    description: '通知描述',
    content: '通知内容',
    meta: '元信息',
    duration: 3000,
    keepAliveOnHover: true,
  });
};
const testAxios = async () => {
  const { data, response } = await apis.get['/test']({
    args: {
      asc: '123',
    },
    isAuth: true,
  });
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <n-button @click="testnotify">naive-ui</n-button>
  <n-button type="primary" @click="testAxios">naive-ui</n-button>
  <n-input />

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
