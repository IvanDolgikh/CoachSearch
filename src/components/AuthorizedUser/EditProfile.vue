<template>
    <div class="user-edit">
        <div class="user-edit__container"
            v-if="props.userData">
            <button class="user-edit__button-cancel"
                @click="$emit('close-modal')">
                <span class="pi pi-times"></span>
            </button>
            <form class="user-edit__form"
                method="post"
                @submit.prevent="updateProfile()">
                <div class="user-edit__base-data-container">
                    <p class="user-edit__title">Личная информация</p>

                    <label class="user-edit__input-container">
                        <span>ФИО</span>
                        <input type="text"
                            v-model="fullName"
                            name="FullName"
                            required />
                    </label>

                    <label class="user-edit__input-container">
                        <span>Номер телефона</span>
                        <input type="tel"
                            v-model="phoneNumber"
                            name="PhoneNumber"
                            required
                            maxlength="11" />
                    </label>

                    <label class="user-edit__input-container">
                        <span>Электронная почта</span>
                        <input type="Email"
                            v-model="email"
                            name="Email"
                            required />
                    </label>

                    <label class="user-edit__input-textarea-container">
                        <span>Расскажите о себе</span>
                        <textarea name="Info"
                            v-model="info"
                            id=""
                            cols="30"
                            rows="5"></textarea>
                    </label>


                    <div v-if="role === 'Coach'">
                        <label class="user-edit__input-container">
                            <span>Возраст</span>
                            <input type="text"
                                v-model="age"
                                name="Age"
                                required
                                maxlength="2" />
                        </label>

                        <label class="user-edit__input-container">
                            <span>Опыт работы</span>
                            <input type="text"
                                v-model="workExperience"
                                name="WorkExperience"
                                required
                                maxlength="2" />
                        </label>

                        <label class="user-edit__input-container">
                            <span>Место проведения тренировок</span>
                            <input type="text"
                                v-model="address"
                                name="Address"
                                required />
                        </label>

                        <label class="user-edit__input-container">
                            <p class="user-edit__title">Специализация</p>
                            <CoachesFiltersSelectButton />

                        </label>
                    </div>
                </div>

                <div class="user-edit__social">
                    <label class="user-edit__input-image-container">
                        <p class="user-edit__title">Ваше фото</p>
                        <img class="user-edit__custom-input-image"
                            :src="checkTypeAvatar"
                            alt="" />
                        <input type="file"
                            class="visually-hidden"
                            name="Avatar"
                            @change="readSrc" />
                    </label>

                    <p class="user-edit__title">Профили в соцсетях</p>

                    <label class="user-edit__input-container">
                        <span>Вконтакте</span>
                        <input type="text"
                            v-model="vkLink"
                            name="VkLink" />
                    </label>

                    <label class="user-edit__input-container">
                        <span>Телеграмм</span>
                        <input type="text"
                            v-model="telegramLink"
                            name="TelegramLink" />
                    </label>
                </div>

                <button class="user-edit__button">
                    Сохранить
                </button>


            </form>
        </div>
    </div>
</template>

<script lang="ts"
    setup>

    import { ref, computed, toRefs } from 'vue'

    import CoachesFiltersSelectButton from './Coaches/CoachesFiltersSelectButton.vue';

    import { useFiltersStore } from '../../store/filtersStore';
    import { usePreloaderStore } from '../../store/preloaderStore'

    import { sendData, baseUrl } from '@api/api';

    const emit = defineEmits(['close-modal', 'update-data'])

    const filtersStore = useFiltersStore()
    const preloaderStore = usePreloaderStore();

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
        userData: ICommonData,
    }>()

    type TAvatarShow = string | File | ArrayBuffer

    const {
        avatarUrl: avatar,
        vkLink,
        telegramLink,
        fullName,
        phoneNumber,
        email,
        info,
        address,
        age,
        workExperience,
    } = toRefs(props.userData)

    const avatarShow = ref<TAvatarShow>(avatar.value);

    // Для отображения раннее выбранных специализаций
    const getCompletedSpecializations = computed<ICompletedSpecializations[]>(() => {
        const spec: string[] | undefined = props.userData?.specializations
        const arrCompletedSpecializations: ICompletedSpecializations[] = []
        if (spec) {
            for (let i = 0; i < spec.length; i++) {
                arrCompletedSpecializations.push({ 'name': spec[i] })
            }
        }
        return arrCompletedSpecializations
    })

    filtersStore.valueSpecialization = getCompletedSpecializations.value

    const readSrc = (evt: Event) => {
        const file: File | undefined = (evt.target as HTMLInputElement).files?.[0];

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
            return avatarShow.value as string
        }
    });

    const urlUpdateCustomer: string = `${baseUrl}api/customer/profile`
    const urlUpdateCoach: string = `${baseUrl}api/coach/profile`

    const updateProfile = async (): Promise<ICommonData> => {
        preloaderStore.loading = true
        const data = {
            email: email.value,
            phoneNumber: phoneNumber.value,
            fullName: fullName.value,
            info: info.value,
            telegramLink: telegramLink.value,
            vkLink: vkLink.value,
            avatar: avatar.value,
            specializations: filtersStore.valueSpecialization.map(item => item.name),
            address: address?.value,
            age: age?.value,
            workExperience: workExperience?.value,
        }

        let result: ICommonData

        if (localStorage.getItem('role') === 'Customer') {
            result = await sendData(urlUpdateCustomer, data)
        } else {
            result = await sendData(urlUpdateCoach, data)
        }

        filtersStore.valueSpecialization = []

        emit('close-modal')

        emit('update-data', result)
        preloaderStore.loading = false
        return result
    }

</script>

<style lang="scss">
.user-edit {

    &__container {
        background-color: $color-bg-default;
        padding: 0 80px;
        margin: 0 auto 10% auto;

        @include vp-1199 {
            padding: 0 60px;
        }

        @include vp-767 {
            padding: 0 20px;
        }
    }

    &__form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 40px;
        position: relative;

        @include vp-767 {
            display: flex;
            flex-direction: column;
        }
    }

    &__title {
        font-size: 26px;
        margin-bottom: 40px;
        color: $color-base-text;
        font-weight: 500;

        @include vp-1199 {
            font-size: 24px;
            margin-bottom: 30px;
        }

        @include vp-767 {
            font-size: 20px;
            margin-bottom: 20px;
        }
    }

    input {
        width: 80%;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid $color-dark;
        color: $color-base-text;
        font-size: 18px;
        padding: 3px 5px 3px 5px;
        transition: border 0.2s;

        &:hover,
        &:focus-visible {
            outline: none;
            border-color: $color-accent-middle;
            transition: border 0.2s;
        }

        &:active {
            border-color: $color-accent-lighter;
        }

        @include vp-1199 {
            font-size: 16px;
        }

        @include vp-767 {
            font-size: 14px;
        }
    }

    span {
        display: block;
        color: $color-base-text;
        font-size: 18px;
        margin-bottom: 14px;
        font-weight: 500;

        @include vp-1199 {
            font-size: 16px;
        }

        @include vp-767 {
            font-size: 14px;
            margin-bottom: 10px;
        }
    }

    &__button-cancel {
        display: block;
        width: fit-content;
        background-color: transparent;
        border: none;
        cursor: pointer;
        margin-left: auto;
        padding: 0;

        span {
            font-size: 28px;
            color: $color-gray-lighter;
        }

        @include vp-1199 {
            span {
                font-size: 24px;
            }
        }

        @include vp-1199 {
            span {
                font-size: 22px;
            }
        }
    }

    &__social {
        grid-column: 2;
    }

    .p-button {
        background: $color-base-white;

        span {
            margin: 0;
        }

        &.p-highlight {
            background-color: $color-accent-lighter;
        }
    }


    &__input-container {
        display: block;
        margin-bottom: 30px;

        @include vp-1199 {
            margin-bottom: 24px;
        }

        @include vp-767 {
            margin-bottom: 20px;
        }
    }

    &__input-textarea-container {
        display: block;
        margin-bottom: 30px;

        @include vp-1199 {
            margin-bottom: 24px;
        }

        @include vp-767 {
            margin-bottom: 20px;
        }

        textarea {
            background-color: transparent;
            resize: none;
            color: $color-base-text;
            font-size: 18px;
            padding: 3px 5px 3px 5px;
            border: 1px solid $color-dark;
            border-radius: 10px;
            width: 80%;
            transition: border 0.2s;

            @include vp-1199 {
                font-size: 16px;
            }

            @include vp-767 {
                font-size: 14px;
            }

            &:hover,
            &:focus-visible {
                outline: none;
                border-color: $color-accent-middle;
                transition: border 0.2s;
            }

            &:active {
                border-color: $color-accent-lighter;
            }
        }
    }


    &__input-image-container {
        display: block;
        margin-bottom: 30px;

        input {
            width: 1px;
            padding: 0;
            border: 0;
        }

        @include vp-767 {
            margin-bottom: 20px;
        }
    }

    &__custom-input-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: rgb(216, 216, 216);
        object-fit: cover;
        cursor: pointer;

        @include vp-1199 {
            width: 160px;
            height: 160px;
        }

        @include vp-767 {
            width: 120px;
            height: 120px;
        }
    }


    &__button {
        display: block;
        grid-column: 1 / 3;
        width: 40%;
        margin: 30px auto 0 auto;
        background-color: #474747;
        color: $color-base-white;
        border: none;
        border-radius: 10px;
        font-size: 20px;
        padding: 12px 30px;
        cursor: pointer;
        transition: background-color 0.2s;

        @include vp-1199 {
            font-size: 16px;
            padding: 8px 22px;
        }

        @include vp-767 {
            font-size: 14px;
            padding: 8px 18px;
        }

        &:hover,
        &:focus-visible {
            outline: none;
            background-color: $color-accent-middle;
            transition: background-color 0.2s;
        }

        &:active {
            background-color: $color-accent-lighter;
        }
    }
}
</style>