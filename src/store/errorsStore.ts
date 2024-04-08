import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorsStore = defineStore('errors', () => {

    const errorAuth = ref<boolean>(false)

    const showAndHideError = () => {
        errorAuth.value = true
        return setTimeout(() => {
            errorAuth.value = false
        }, 5000)
    }

    return { errorAuth, showAndHideError }
})