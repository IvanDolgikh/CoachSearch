import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useBlocksStore } from '../store/store'
import { sendData } from '../api/api'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const blocksStore = useBlocksStore()

    const urlAuth = 'http://localhost:5161/api/auth/login'

    const login = ref('')
    const password = ref('')
    
    
    const sendDataAuth = async () =>  {
        const data = {
            login: login.value,
            password: password.value,
        }
        
        try {
            const response = await sendData(urlAuth, data)
            localStorage.setItem('token', response.token)
            localStorage.setItem('role', response.role)
            blocksStore.logIn()
            router.push('/authorized-user')
            console.log(data)
            return response
        } catch (error) {
            console.error(error);
        }

    }

    return { login, password, sendDataAuth }
})