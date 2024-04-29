<template>
    <div class="registration">
        <div class="registration__container">
            <form class="registration__form"
                method="post"
                @submit.prevent="registerStore.sendDataReg()">
                <div class="registration__base-data base-data">
                    <span class="registration__title">Личная информация</span>

                    <label class="base-data__input-container">
                        <span>ФИО</span>
                        <input type="text"
                            name="FullName"
                            required
                            v-model="fullName" />
                    </label>

                    <label class="base-data__input-container">
                        <span>Номер телефона</span>
                        <input type="tel"
                            name="PhoneNumber"
                            required
                            maxlength="11"
                            v-model="phoneNumber" />
                    </label>

                    <label class="base-data__input-container">
                        <span>Электронная почта</span>
                        <input type="email"
                            name="Email"
                            v-model="email"
                            required />
                    </label>

                    <label class="base-data__input-textarea-container">
                        <span>Расскажите о себе</span>
                        <textarea name="Info"
                            id=""
                            cols="30"
                            rows="5"
                            v-model="info"></textarea>
                    </label>

                    <Transition name="slide-fade">
                        <div v-if="registerStore.userRole">
                            <label class="base-data__input-container">
                                <span>Место проведения<br />тренировок</span>
                                <input type="text"
                                    name="Address"
                                    v-model="address" />
                            </label>
                        </div>
                    </Transition>
                </div>

                <div class="registration__social social">
                    <label class="social__input-image-container">
                        <span>Ваше фото</span>
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
                            name="VkLink"
                            v-model="vkLink" />
                    </label>

                    <label class="social__input-container">
                        <span>Телеграмм</span>
                        <input type="text"
                            name="TelegramLink"
                            v-model="telegramLink" />
                    </label>
                </div>

                <div class="registration__entrance-data">
                    <label class="registration__input-container">
                        <span>Пароль</span>
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
            padding: 35px;
            background-color: rgb(255 255 255);
            border-radius: 8px;
            box-shadow: 7px 7px 17px 6px rgba(0, 0, 0, 0.2);
            margin: 10% 0;
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

        &__form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 40px;
            position: relative;
        }

        &__social {
            grid-column: 2;
        }

        &__button-container {
            display: flex;
            justify-content: space-between;
            grid-column: 1 / 3;
        }

        &__checkbox-container {
            display: flex;
            align-items: center;
            column-gap: 10px;

            span {
                font-size: 16px;
                margin: 0;
            }
        }

        &__button {
            display: block;
            background-color: #474747;
            color: rgb(255 255 255);
            border: none;
            border-radius: 10px;
            font-size: 20px;
            padding: 12px 30px;
            cursor: pointer;
        }

        &__entrance-data {
            display: flex;
            justify-content: space-between;
            grid-column: 1 / 3;
            margin: 50px 0 60px 0;
            column-gap: 60px;

            .registration__input-container {
                width: 100%;
            }

            input {
                width: 100%;
            }
        }

        span.registration__title {
            font-size: 26px;
            margin-bottom: 20px;
        }

        &__error {
            position: absolute;
            top: -64px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: fit-content;
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

            span {
                font-size: 26px;
                margin-bottom: 20px;
            }

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
            margin-bottom: 20px;
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

    .error-enter-active,
    .error-leave-active {
        transition: opacity 0.2s ease;
    }

    .error-enter-from,
    .error-leave-to {
        opacity: 0;
    }
</style>