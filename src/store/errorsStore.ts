import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorsStore = defineStore('errors', () => {

    const errorAuth = ref<boolean>(false)

    type TSetTimeout = ReturnType<typeof setTimeout>

    const showAndHideAuthError = ():TSetTimeout => {
        errorAuth.value = true
        return setTimeout(() => {
            errorAuth.value = false
        }, 5000)
    }

    type TRefBoolean = ReturnType<typeof ref<boolean>>

    interface IRegisterErrors {
        [key: string]: {
            readonly errorText: string,
            errorValue: TRefBoolean
        },
    }

    const errorPhoneReg = ref<boolean>(false)
    const errorEmailReg = ref<boolean>(false)

    const registerErrors: IRegisterErrors = {
        errorPhone: {
            errorText: 'Пользователь с таким номером телефона уже существует',
            errorValue: errorPhoneReg
        },
        errorEmail: {
            errorText: 'Пользователь с такой почтой уже существует',
            errorValue: errorEmailReg
        },
    }

    const showAndHideRegError = (error: string): TSetTimeout => {
        for(let value in registerErrors) {
            const currentError = registerErrors[value]
            if(currentError.errorText === error) {
                currentError.errorValue.value = true

                return setTimeout(() => {
                    currentError.errorValue.value = false 
                }, 5000)
            }
        }
        return setTimeout(() => {}, 0);
    }  

    const errorGettingData = ref<boolean>(false)

    const showAndHideGettingDataError = (): TSetTimeout => {
        errorGettingData.value = true
        return setTimeout(() => {
            errorAuth.value = false
        }, 5000)
    }

    const errorLeaveLike = ref<boolean>(false)

    const showAndHideLeaveLikeError = (): TSetTimeout => {
        errorLeaveLike.value = true
        return setTimeout(() => {
            errorLeaveLike.value = false
        }, 3000)
    }

    return { errorAuth,
            showAndHideAuthError,
            registerErrors,
            showAndHideRegError,
            errorPhoneReg,
            errorEmailReg,
            errorGettingData,
            showAndHideGettingDataError,
            errorLeaveLike,
            showAndHideLeaveLikeError}
})