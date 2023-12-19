import { createApp } from 'vue'
import './assets/style/style.scss'
import 'normalize.css'
import { router } from './router/router.js'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps';
import App from './App.vue'

const pinia = createPinia()

createApp(App)
            .use(router)
            .use(pinia)
            .use(createYmaps({
                apikey: 'b9792c26-9b3a-42d8-a4f6-5160e8801ffc',
              }))
            .mount('#app')
