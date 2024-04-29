<template>
    <div class="user-edit">
        <div class="user-edit__container"
            v-if="props.userData">
            <button class="user-edit__button-cancel"
                @click="$emit('close-modal')">
                <span class="pi pi-times"></span>
            </button>
            <form class="user-edit__form"
                method="post">
                <div class="user-edit__base-data base-data">
                    <span class="base-data__title">Личная информация</span>

                    <label class="base-data__input-container">
                        <span>ФИО</span>
                        <input type="text"
                            v-model="fullName"
                            name="FullName"
                            required />
                    </label>

                    <label class="base-data__input-container">
                        <span>Номер телефона</span>
                        <input type="tel"
                            v-model="phoneNumber"
                            name="PhoneNumber"
                            required
                            maxlength="11" />
                    </label>

                    <label class="base-data__input-container">
                        <span>Электронная почта</span>
                        <input type="Email"
                            v-model="email"
                            name="Email"
                            required />
                    </label>

                    <label class="base-data__input-textarea-container">
                        <span>Расскажите о себе</span>
                        <textarea name="Info"
                            v-model="info"
                            id=""
                            cols="30"
                            rows="5"></textarea>
                    </label>


                    <div v-if="role === 'Coach'">
                        <label class="base-data__input-container">
                            <span>Возраст</span>
                            <input type="text"
                                v-model="age"
                                name="Age"
                                required
                                maxlength="2" />
                        </label>

                        <label class="base-data__input-container">
                            <span>Опыт работы</span>
                            <input type="text"
                                v-model="workExperience"
                                name="WorkExperience"
                                required
                                maxlength="2" />
                        </label>

                        <label class="base-data__input-container">
                            <span>Место проведения<br />тренировок</span>
                            <input type="text"
                                v-model="address"
                                name="Address"
                                required />
                        </label>

                        <label class="base-data__input-container">
                            <span>Специализация</span>
                            <CoachesFiltersSelectButton />

                        </label>
                    </div>
                </div>

                <div class="user-edit__social social">
                    <label class="social__input-image-container">
                        <span class="social__title">Ваше фото</span>
                        <img class="social__custom-input-image"
                            :src="checkTypeAvatar"
                            alt="" />
                        <input type="file"
                            class="visually-hidden"
                            name="Avatar"
                            @change="readSrc" />
                    </label>

                    <span class="social__title">Профили в соцсетях</span>

                    <label class="social__input-container">
                        <span>Вконтакте</span>
                        <input type="text"
                            v-model="vkLink"
                            name="VkLink" />
                    </label>

                    <label class="social__input-container">
                        <span>Телеграмм</span>
                        <input type="text"
                            v-model="telegramLink"
                            name="TelegramLink" />
                    </label>
                </div>

                <button class="user-edit__button"
                    @click.prevent="updateProfile()">
                    Сохранить
                </button>


            </form>
        </div>
    </div>
</template>

<script lang="ts"
    setup>

    import { ref, computed } from 'vue'

    import CoachesFiltersSelectButton from './Coaches/CoachesFiltersSelectButton.vue';

    import { useFiltersStore } from '../../store/filtersStore';

    import { sendData, baseUrl } from '@api/api';

    const emit = defineEmits(['close-modal', 'update-data'])

    const filtersStore = useFiltersStore()

    const role: string = localStorage.getItem("role") || "";

    interface IData {
        avatarUrl: string | File | ArrayBuffer;
        vkLink: string;
        telegramLink: string;
        fullName: string;
        phoneNumber: string;
        email: string;
        info: string;
    }

    interface IAdditionalDataTrainer {
        specializations?: string[];
        age?: number;
        workExperience?: string;
        isRegistrationFinished?: boolean
        address?: string,
    }

    interface ICommonData extends IData, IAdditionalDataTrainer { }

    interface ICompletedSpecializations {
        name: string
    }

    const props = defineProps<{
        userData: ICommonData | undefined,
    }>()

    // Для отображения раннее выбранных специализаций
    const getCompletedSpecializations = computed<ICompletedSpecializations[]>(() => {
        const spec = props.userData?.specializations
        const arrCompletedSpecializations: ICompletedSpecializations[] = []
        if (spec) {
            for (let i = 0; i < spec.length; i++) {
                arrCompletedSpecializations.push({ 'name': spec[i] })
            }
        }
        return arrCompletedSpecializations
    })

    filtersStore.valueSpecialization = getCompletedSpecializations.value

    const avatar = ref<string | File | ArrayBuffer>(props.userData?.avatarUrl ?? '')
    const vkLink = ref<string>(props.userData?.vkLink ?? '')
    const telegramLink = ref<string>(props.userData?.telegramLink ?? '')
    const fullName = ref<string>(props.userData?.fullName ?? '')
    const phoneNumber = ref<string>(props.userData?.phoneNumber ?? '')
    const email = ref<string>(props.userData?.email ?? '')
    const info = ref<string>(props.userData?.info ?? '')

    const address = ref<string>(props.userData?.address ?? '')
    const age = ref<number>(props.userData?.age ?? 0)
    const workExperience = ref<string>(props.userData?.workExperience ?? '')


    type TAvatarShow = string | File | ArrayBuffer

    const avatarShow = ref<TAvatarShow>(avatar.value);

    const readSrc = (evt: Event) => {
        const file = (evt.target as HTMLInputElement)?.files?.[0];

        if (file) {
            avatar.value = file;

            const reader: FileReader = new FileReader();

            reader.onload = (): void => {
                if (reader.result) {
                    avatarShow.value = reader.result
                }
            };

            reader.readAsDataURL(file);
        }
    };


    const isArrayBufferAvatar = (avatar: TAvatarShow): avatar is ArrayBuffer => {
        return avatar instanceof ArrayBuffer
    }

    const checkTypeAvatar = computed<string>(() => {
        if (isArrayBufferAvatar(avatarShow.value)) {
            return URL.createObjectURL(new Blob([avatarShow.value]));
        }

        else {
            return avatarShow.value.toString();
        }
    });

    const urlUpdateCustomer: string = `${baseUrl}api/customer/profile`
    const urlUpdateCoach: string = `${baseUrl}api/coach/profile`

    const updateProfile = async (): Promise<void> => {
        const data: ICommonData = {
            email: email.value,
            phoneNumber: phoneNumber.value,
            fullName: fullName.value,
            info: info.value,
            telegramLink: telegramLink.value,
            vkLink: vkLink.value,
            avatar: avatar.value,
            specializations: filtersStore.valueSpecialization.map(item => item.name),
            address: address.value,
            age: age.value,
            workExperience: workExperience.value,
        }

        let result: any

        if (localStorage.getItem('role') === 'Customer') {
            result = await sendData(urlUpdateCustomer, data)
        } else {
            result = await sendData(urlUpdateCoach, data)
        }

        emit('close-modal')

        emit('update-data', result)

        return result
    }

    // const updateCoachProfile = async () => {
    //     const data: ICommonData = {
    //         email: email.value,
    //         phoneNumber: phoneNumber.value,
    //         fullName: fullName.value,
    //         info: info.value,
    //         telegramLink: telegramLink.value,
    //         vkLink: vkLink.value,
    //         avatar: avatar.value,
    //         specializations: filtersStore.valueSpecialization.map(item => item.name),
    //         address: address.value,
    //         age: age.value,
    //         workExperience: workExperience.value,
    //     }

    //     const result = await sendData(urlUpdateCoach, data)

    //     emit('close-modal')

    //     emit('update-data', result)

    // }

</script>

<style lang="scss">
@import "@variables";

.user-edit {

    &__container {
        background-color: $color-bg-default;
        padding: 0 80px;
        margin: 7% auto 10% auto;
    }

    input {
        width: 80%;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #333333;
        color: rgb(51, 51, 51);
        font-size: 18px;
        padding: 3px 5px 3px 5px;

        &:focus-visible {
            outline: none;
        }
    }

    span {
        display: block;
        color: rgb(51, 51, 51);
        font-size: 18px;
        margin-bottom: 15px;
        font-weight: 500;
    }

    span.base-data__title {
        font-size: 26px;
        margin-bottom: 40px;
    }

    &__form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 40px;
        position: relative;
    }

    &__social {
        grid-column: 2;
    }

    &__button {
        grid-column: 1 / 3;
        width: 40%;
        margin: 30px auto 0 auto;
        display: block;
        background-color: #474747;
        color: rgb(255 255 255);
        border: none;
        border-radius: 10px;
        font-size: 20px;
        padding: 12px 30px;
        cursor: pointer;
    }

    &__button-cancel {
        display: block;
        width: fit-content;
        background-color: transparent;
        border: none;
        cursor: pointer;
        margin-left: auto;

        span {
            font-size: 28px;
            color: $color-gray-lighter;
        }
    }

    .p-button {
        background: $color-base-white;
        border-radius: 10px;

        span {
            margin: 0;
        }

        &::before {
            display: none;
        }

        &.p-highlight {
            background-color: $color-accent-lighter;
        }
    }
}

.base-data {

    &__input-container {
        display: block;
        margin-bottom: 30px;
    }

    &__input-textarea-container {
        display: block;
        margin-bottom: 15px;

        textarea {
            background-color: transparent;
            resize: none;
            color: rgb(51, 51, 51);
            font-size: 20px;
            padding: 3px 5px 3px 5px;
            border: 1px solid 1px solid #333333;
            border-radius: 10px;
            width: 80%;

            &:focus-visible {
                outline: none;
            }
        }
    }
}

.social {
    &__input-container {
        display: block;
        margin-bottom: 30px;
    }

    &__input-image-container {
        display: block;
        margin-bottom: 30px;

        input {
            width: 1px;
            padding: 0;
            border: 0;
        }
    }

    &__custom-input-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: rgb(216, 216, 216);
        object-fit: cover;
        cursor: pointer;
    }

    span.social__title {
        font-size: 26px;
        margin-bottom: 40px;
    }
}


.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(40px);
    opacity: 0;
}
</style>