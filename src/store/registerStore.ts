import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { sendData, baseUrl } from '@api/api.ts'
import { usePreloaderStore } from './preloaderStore'
import { useErrorsStore } from './errorsStore'
import { ref, reactive, computed } from 'vue'


export const useRegisterStore = defineStore('register', () => {

    const router = useRouter()
    const preloaderStore = usePreloaderStore();
    const errorsStore = useErrorsStore()

    interface IProfile {
        name: string
    }

    const checkRole = (role: string): IProfile => {
        if(role === 'Customer') {
            return {name: 'user-profile'}
        } else {
            return {name: 'coach-profile'}
        }
    }

    const urlBase: string = `${baseUrl}api/auth/register`

    interface IDataUser {
        phoneNumber: string,
        email: string,
        password: string,
        fullName: string,
        info: string,
        vkLink: string,
        telegramLink: string,
        avatar: File | null,
    }

    interface IAdditionalDataTrainer {
        address?: string,
    }

    interface ICommonData extends IDataUser, IAdditionalDataTrainer {}

    //Общие данные
    const commonData = reactive<IDataUser>({
        phoneNumber: '',
        email: '',
        password: '',
        fullName: '',
        info: '',
        vkLink: '',
        telegramLink: '',
        avatar: null,
    })

    // Убрать специализацию при регистрации!!!!
    const additionalDataTrainer = reactive<IAdditionalDataTrainer>({
        address: '',
    })


    const userRole = ref<boolean>(false)
    
    const checkUserRole = computed<string>(() => userRole.value ? 'coach' : 'customer')

    //TODO
    
    const sendDataReg = async(): Promise<any> =>  {
        preloaderStore.loading = true

        const data: ICommonData = {
            phoneNumber: commonData['phoneNumber'],
            email: commonData['email'],
            password: commonData['password'],
            fullName: commonData['fullName'],
            info: commonData['info'],
            vkLink: commonData['vkLink'],
            telegramLink: commonData['telegramLink'],
            avatar: commonData['avatar'],
        }

        try {
            // checkUserRole.value === 'customer' || checkUserRole.value === 'trainer' 
            if(['customer', 'coach'].includes(checkUserRole.value)) {
                if(checkUserRole.value === 'coach') {
                    data.address = additionalDataTrainer['address']
                }

                const response: any = await sendData(`${urlBase}/${checkUserRole.value}`, data)
                localStorage.setItem('accessToken', response.accessToken)
                localStorage.setItem('role', response.role)

                const role: string = localStorage.getItem('role') || '';
                const checkedRole: IProfile = checkRole(role)
                preloaderStore.loading = false

                router.push(checkedRole)
                return response
            } else {
                console.log('Несуществующая роль')
            }
            
        } catch(error: any) {
            preloaderStore.loading = false
            errorsStore.showAndHideRegError(error.message)
        }
    }

    return { commonData, additionalDataTrainer, userRole, checkUserRole, sendDataReg }
})


