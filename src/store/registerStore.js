import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useBlocksStore } from '../store/store'
import { sendData, baseUrl } from '@api/api.js'
import { ref, reactive, computed } from 'vue'


export const useRegisterStore = defineStore('register', () => {

    const router = useRouter()
    const blocksStore = useBlocksStore()

    const urlBase = `${baseUrl}api/auth/register`

    //Общие данные
    const commonData = reactive({
        phoneNumber: '',
        email: '',
        password: '',
        fullName: '',
        info: '',
        vkLink: '',
        telegramLink: '',
        avatar: ''
    })

    //Доп данные для тренера
    const additionalTrainerData = reactive({
        specialization: '',
        address: '',
    })

    const userRole = ref(false)
    
    const checkUserRole = computed(() => userRole.value ? 'trainer' : 'customer')
    
    const sendDataReg = async() =>  {

        const data = {
            phoneNumber: commonData['phoneNumber'],
            email: commonData['email'],
            password: commonData['password'],
            fullName: commonData['fullName'],
            info: commonData['info'],
            vkLink: commonData['vkLink'],
            telegramLink: commonData['telegramLink'],
            avatar: commonData['avatar']
        }

        try {

            if(checkUserRole.value === 'customer' || checkUserRole.value === 'trainer') {
                if(checkUserRole.value === 'trainer') {
                    data.specialization = additionalTrainerData['specialization'];
                    data.address = additionalTrainerData['address']
                }

                const response = await sendData(`${urlBase}/${checkUserRole.value}`, data)
                localStorage.setItem('token', response.token)
                localStorage.setItem('role', response.role)
                blocksStore.logIn();
                router.push('/authorized-user')
                return response
            } else {
                console.log('Не существующая роль')
            }
            
        } catch(error) {
            console.error(error);
        }
    }

    return { commonData, additionalTrainerData, userRole, checkUserRole, sendDataReg }
})


