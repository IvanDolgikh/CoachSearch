<template>
    <div class="registration">
        <div class="registration__container">
            <form class="registration__form"
                method="post"
                @submit.prevent="registerStore.sendDataReg()">
                <div class="registration__base-data">
                    <p class="registration__title">Личная информация</p>

                    <label class="registration__input-container">
                        <span>ФИО <sup>*</sup></span>
                        <input type="text"
                            name="FullName"
                            required
                            v-model="fullName" />
                    </label>

                    <label class="registration__input-container">
                        <span>Номер телефона <sup>*</sup></span>
                        <InputMask name="PhoneNumber"
                            required
                            v-model="phoneNumber"
                            mask="8-999-999-99-99"
                            placeholder="8-999-999-99-99" />
                    </label>

                    <label class="registration__input-container">
                        <span>Электронная почта <sup>*</sup></span>
                        <input type="email"
                            name="Email"
                            placeholder="user@mail.ru"
                            v-model="email"
                            required />
                    </label>

                    <label class="registration__input-textarea-container">
                        <span>Расскажите о себе</span>
                        <textarea name="Info"
                            id=""
                            cols="30"
                            rows="5"
                            v-model="info"></textarea>
                    </label>

                    <Transition name="slide-fade">
                        <div v-if="registerStore.userRole">
                            <label class="registration__input-container">
                                <span>Место проведения<br />тренировок <sup>*</sup></span>
                                <input type="text"
                                    name="Address"
                                    required
                                    v-model="address" />
                            </label>
                        </div>
                    </Transition>
                </div>

                <div class="registration__social">
                    <label class="registration__input-image-container">
                        <p class="registration__title">Ваше фото</p>
                        <img class="registration__custom-input-image"
                            :src="checkTypeAvatar"
                            alt="" />
                        <input type="file"
                            class="visually-hidden"
                            name="Avatar"
                            @change="readSrc" />
                    </label>

                    <p class="registration__title">Профили в соцсетях</p>

                    <label class="registration__input-container">
                        <span>Вконтакте</span>
                        <input type="text"
                            name="VkLink"
                            v-model="vkLink" />
                    </label>

                    <label class="registration__input-container">
                        <span>Телеграмм</span>
                        <input type="text"
                            name="TelegramLink"
                            v-model="telegramLink" />
                    </label>
                </div>

                <div class="registration__entrance-data">
                    <label class="registration__input-container">
                        <span>Пароль <sup>*</sup></span>
                        <input type="password"
                            name="Password"
                            required
                            v-model="password" />
                    </label>
                </div>

                <div class="registration__button-container">
                    <label class="registration__checkbox-container">
                        <input type="checkbox"
                            v-model="registerStore.userRole" />
                        <span>Я&nbsp;тренер</span>
                    </label>
                    <button class="registration__button">
                        Зарегистрироваться
                    </button>
                </div>
            </form>

            <transition name="error">
                <ErrorReg class="registration__error"
                    v-if="errorsStore.errorPhoneReg || errorsStore.errorEmailReg" />
            </transition>
        </div>
    </div>
</template>

<script setup
    lang="ts">

    import ErrorReg from "../Common/ErrorReg.vue";

    import InputMask from 'primevue/inputmask';

    import { ref, toRefs, computed } from "vue";
    import { useRegisterStore } from "../../store/registerStore";

    import { useErrorsStore } from "../../store/errorsStore";

    const registerStore = useRegisterStore();
    const errorsStore = useErrorsStore()

    const {
        phoneNumber,
        email,
        password,
        fullName,
        info,
        vkLink,
        telegramLink,
        avatar,
    } = toRefs(registerStore.commonData);

    const { address } = toRefs(registerStore.additionalDataTrainer)

    type TAvatarShow = string | ArrayBuffer

    const avatarShow = ref<TAvatarShow>('');

    const readSrc = (evt: Event) => {
        const file: File | undefined = (evt.target as HTMLInputElement)?.files?.[0];

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
            return avatarShow.value;
        }
    });

</script>

<style lang="scss"
    scoped>
    .registration {
        flex: auto;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;

        &__container {
            position: relative;
            width: fit-content;
            height: auto;
            padding: 28px;
            background-color: rgb(255 255 255);
            border-radius: 8px;
            box-shadow: 7px 7px 17px 6px rgba(0, 0, 0, 0.2);

            @include vp-1199 {
                padding: 24px;
            }

            @include vp-1199 {
                padding: 18px;
            }
        }

        &__title {
            font-size: 20px;
            margin-bottom: 18px;
            font-weight: 500;

            @include vp-767 {
                font-size: 16px;
            }
        }

        input {
            width: 80%;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid $color-dark;
            font-size: 14px;
            padding: 0 5px 3px 5px;
            font-weight: 400;
            transition: border 0.2s;

            @include vp-767 {
                font-size: 14px;
            }

            &:hover,
            &:focus-visible {
                outline: none;
                border-color: $color-accent;
                transition: border 0.2s;
            }

            &:active {
                border-color: $color-accent-middle;
            }
        }

        span {
            display: block;
            font-size: 14px;
            margin-bottom: 8px;
            font-weight: 500;

            @include vp-767 {
                font-size: 13px;
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

        &__social {
            grid-column: 2;
        }

        &__button-container {
            display: flex;
            justify-content: space-between;
            grid-column: 1 / 3;

            @include vp-767 {
                display: flex;
                flex-direction: column;
            }
        }

        &__checkbox-container {
            display: flex;
            align-items: center;
            column-gap: 10px;

            span {
                font-size: 14px;
                margin: 0;

                @include vp-767 {
                    font-size: 12px;
                }
            }

            @include vp-767 {
                width: fit-content;
                margin-bottom: 30px;
            }
        }

        &__button {
            display: block;
            background-color: #474747;
            color: $color-base-white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            padding: 8px 24px;
            cursor: pointer;
            transition: background-color 0.2s;

            @include vp-767 {
                font-size: 14px;
                padding: 6px 12px;
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

        &__entrance-data {
            display: flex;
            justify-content: space-between;
            grid-column: 1 / 3;
            margin: 14px 0 20px 0;
            column-gap: 60px;

            @include vp-767 {
                margin: 0;
                margin-bottom: 20px;
            }

            .registration__input-container {
                width: 80%;
            }

            input {
                width: 100%;
            }

        }

        &__error {
            position: absolute;
            top: -64px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: fit-content;
        }

        sup {
            color: $color-accent;
            vertical-align: bottom;
            font-size: 16px;

            @include vp-767 {
                font-size: 14px;
            }
        }

        &__input-container {
            display: block;
            margin-bottom: 22px;

            @include vp-767 {
                margin-bottom: 18px;
            }
        }

        &__input-textarea-container {
            display: block;
            margin-bottom: 15px;

            textarea {
                background-color: transparent;
                resize: none;
                font-size: 14px;
                padding: 3px 5px 3px 5px;
                border: 1px solid $color-dark;
                border-radius: 10px;
                width: 80%;

                @include vp-767 {
                    font-size: 14px;
                }

                &:hover,
                &:focus-visible {
                    outline: none;
                    border-color: $color-accent;
                    transition: border 0.2s;
                }

                &:active {
                    border-color: $color-accent-middle;
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
        }

        &__custom-input-image {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            background-color: rgb(216, 216, 216);
            object-fit: cover;
            cursor: pointer;

            @include vp-1199 {
                width: 140px;
                height: 140px;
            }

            @include vp-767 {
                width: 120px;
                height: 120px;
            }
        }
    }

    .p-inputtext {
        border-radius: 0;
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

    .error-enter-active,
    .error-leave-active {
        transition: opacity 0.2s ease;
    }

    .error-enter-from,
    .error-leave-to {
        opacity: 0;
    }
</style>