import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/CoachSearch",
  
  plugins: [vue(), svgLoader()],

  resolve: {
    alias: [
      { find: '@api', replacement: path.resolve(__dirname, './src/api')},
      { find: '@icons-svg', replacement: path.resolve(__dirname, './src/assets/images/svg')},
    ],
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/style/mixins.scss";
          @import "./src/assets/style/variables.scss";
        `
      }
    }
  }
})
