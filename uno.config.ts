// uno.config.ts
import {defineConfig, presetUno, presetIcons} from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetUno,
    presetIcons({
    }),
  ],
})
