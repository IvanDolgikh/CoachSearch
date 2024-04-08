<template>
    <div class="user-edit">
        <div class="user-edit__container"
            v-if="props.userData">
            <!-- <router-link class="user-edit__button-cancel"
                @click="goBack()"
                to="/">
                <span class="pi pi-times"></span>
            </router-link> -->
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
                        <input type="email"
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


                    <div v-if="role === 'Trainer'">
                        <label class="base-data__input-container">
                            <span>Место проведения<br />тренировок</span>
                            <input type="text"
                                v-model="address"
                                name="Address"
                                required />
                        </label>

                        <label class="base-data__input-container">
                            <span>Специализация</span>
                            <input type="text"
                                v-model="specialization"
                                name="Specialization"
                                required />
                        </label>
                    </div>
                </div>

                <div class="user-edit__social social">
                    <label class="social__input-image-container">
                        <span class="social__title">Ваше фото</span>
                        <img class="social__custom-input-image"
                            :src="avatarUrl"
                            alt="" />
                        <input type="file"
                            class="visually-hidden"
                            name="Avatar" />
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

                <button class="user-edit__button">
                    Сохранить
                </button>


            </form>
        </div>
    </div>
</template>

<script lang="ts"
    setup>

    import { ref } from 'vue'

    const role: string = localStorage.getItem("role") || "";

    interface IData {
        avatarUrl: string;
        vkLink: string;
        telegramLink: string;
        fullName: string;
        phoneNumber: string;
        email: string;
        info: string;
    }

    interface IAdditionalDataTrainer {
        specialization?: string,
        address?: string,
    }

    interface ICommonData extends IData, IAdditionalDataTrainer { }

    const props = defineProps<{
        userData: ICommonData | undefined,
    }>()

    const emit = defineEmits(['close-modal'])

    const avatarUrl = ref<string>(props.userData?.avatarUrl ?? '')
    const vkLink = ref<string>(props.userData?.vkLink ?? '')
    const telegramLink = ref<string>(props.userData?.telegramLink ?? '')
    const fullName = ref<string>(props.userData?.fullName ?? '')
    const phoneNumber = ref<string>(props.userData?.phoneNumber ?? '')
    const email = ref<string>(props.userData?.email ?? '')
    const info = ref<string>(props.userData?.info ?? '')

    const specialization = ref<string>(props.userData?.specialization ?? '')
    const address = ref<string>(props.userData?.address ?? '')

    console.log(props.userData)

</script>

<style lang="scss"
    scoped>
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