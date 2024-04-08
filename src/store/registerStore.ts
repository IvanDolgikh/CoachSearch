import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { sendData, baseUrl } from '@api/api.ts'
import { usePreloaderStore } from './preloaderStore'
import { ref, reactive, computed } from 'vue'


export const useRegisterStore = defineStore('register', () => {

    const router = useRouter()
    const preloaderStore = usePreloaderStore();

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
        specialization?: string,
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
        specialization: '',
        address: '',
    })

    const userRole = ref<boolean>(false)
    
    const checkUserRole = computed<string>(() => userRole.value ? 'trainer' : 'customer')

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
            if(['customer', 'trainer'].includes(checkUserRole.value)) {
                if(checkUserRole.value === 'trainer') {
                    data.specialization = additionalDataTrainer['specialization'];
                    data.address = additionalDataTrainer['address']
                }

                const response: any = await sendData(`${urlBase}/${checkUserRole.value}`, data)
                localStorage.setItem('token', response.token)
                localStorage.setItem('role', response.role)

                const role: string = localStorage.getItem('role') || '';
                const checkedRole: TProfile = checkRole(role)
                preloaderStore.loading = false

                router.push(checkedRole)
                
                return response
            } else {
                console.log('Несуществующая роль')
            }
            
        } catch(error) {
            console.error(error);
        }
    }

    return { commonData, additionalDataTrainer, userRole, checkUserRole, sendDataReg }
})


