import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { sendData, baseUrl } from '@api/api.ts'
import { usePreloaderStore } from './preloaderStore'
import { useErrorsStore } from './errorsStore'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const preloaderStore = usePreloaderStore();
    const errorsStore = useErrorsStore()
    
    type TProfile = {
        name: string
    }

    const checkRole = (role: string): TProfile => {
        if(role === 'Customer') {
            return {name: 'user-profile'}
        } else {
            return {name: 'coach-profile'}
        }
    }

    const urlAuth: string = `${baseUrl}api/auth/login`
    const login = ref<string>('')
    const password = ref<string>('')

    interface IData {
        login: string,
        password: string,
    }
    
    // TODO
    const sendDataAuth = async(): Promise<any> =>  {
        
        preloaderStore.loading = true

        const data: IData = {
            login: login.value,
            password: password.value,
        }
        
        try {
            const response: any = await sendData(urlAuth, data)

            localStorage.setItem('token', response.token)
            localStorage.setItem('role', response.role)
            localStorage.setItem('isAuthorizedUser', 'true')

            const role: string = localStorage.getItem('role') || '';

            const checkedRole: TProfile = checkRole(role)

            preloaderStore.loading = false

            router.push(checkedRole)
            
            return response
        } catch (error) {
            preloaderStore.loading = false
            // errorsStore.showAndHideError()
            errorsStore.errorAuth = true
            console.error(error);
        }
    }

    return { login, password, sendDataAuth, checkRole }
})