import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useCoordsStore = defineStore('coords', () => {
    const coords = ref([])
    const address = ref([])

    return { coords, address }
})