import { computed, ref } from 'vue';
import {
  createDiscreteApi,
  ConfigProviderProps,
  darkTheme,
  lightTheme,
} from 'naive-ui';

const themeRef = ref<'light' | 'dark'>('light');
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme,
}));

/**
 * 单独设置通知 api
 */
export const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef,
  },
);
