import { createApp } from 'vue'
import './assets/style/style.scss'
import 'normalize.css'
import { router } from './router/router.ts'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import App from './App.vue'

const pinia = createPinia()

createApp(App)
            .use(router)
            .use(pinia)
            .use(createYmaps({
                apikey: 'b9792c26-9b3a-42d8-a4f6-5160e8801ffc',
              }))
            .use(PrimeVue)
            .mount('#app')

