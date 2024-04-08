import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePreloaderStore = defineStore('preloader', () => {
    const loading = ref<boolean>(false)

    return { loading }
})