import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCoordsStore = defineStore('coords', () => {
    const coords = ref<number[]>([])
    const address = ref<string[]>([])

    return { coords, address }
})