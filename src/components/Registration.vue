<template>
<div class="registration">
    <div class="registration__container">
        <form class="registration__form" method="post" @submit.prevent="registerStore.sendDataReg()">

            <div class="registration__base-data base-data">
                <span class="registration__title">Личная информация</span>

                <label class="base-data__input-container">
                    <span>ФИО</span>
                    <input type="text" name="FullName" required v-model="fullName">
                </label>

                <label class="base-data__input-container">
                    <span>Номер телефона</span>
                    <input type="tel" name="PhoneNumber" required maxlength="11" v-model="phoneNumber">
                </label>

                <label class="base-data__input-container">
                    <span>Электронная почта</span>
                    <input type="email" name="Email" v-model="email" required>
                </label>

                <label class="base-data__input-textarea-container">
                    <span>Расскажите о себе</span>
                    <textarea name="Info" id="" cols="30" rows="5" v-model="info"></textarea>
                </label>

                <label class="base-data__input-container" v-if="registerStore.userRole">
                    <span>Место проведения<br>тренировок</span>
                    <input type="text" name="Address" v-model="address">
                </label>

                <label class="base-data__input-container" v-if="registerStore.userRole">
                    <span>Специализация</span>
                    <input type="text" required v-model="specialization">
                </label>
            </div>

            <div class="registration__social social">
                <label class="social__input-image-container">
                    <span>Ваше фото</span>
                    <img class="social__custom-input-image" :src="avatarShow" alt="">
                    <input type="file" class="visually-hidden" name="Avatar" @change="readSrc">
                </label>

                <span class="social__title">Профили в соцсетях</span>

                <label class="social__input-container">
                    <span>Вконтакте</span>
                    <input type="text" name="VkLink" v-model="vkLink">
                </label>

                <label class="social__input-container">
                    <span>Телеграмм</span>
                    <input type="text" name="TelegramLink" v-model="telegramLink">
                </label>
            </div>

            <div class="registration__entrance-data">
                <label class="registration__input-container">
                    <span>Пароль</span>
                    <input type="password" name="Password" required v-model="password">
                </label>
            </div>

            <div class="registration__button-container">
                <label class="registration__checkbox-container">
                    <input type="checkbox" v-model="registerStore.userRole">
                    <span>Я&nbsp;тренер</span>
                </label>
                <button class="registration__button">Зарегистрироваться</button>
            </div>

        </form>
    </div>
</div>
</template>

<script setup>
import { computed, ref, toRefs} from 'vue'
import { useRegisterStore } from '../store/registerStore'

const registerStore = useRegisterStore();

const {phoneNumber, email, password, fullName, info, vkLink, telegramLink, avatar} = toRefs(registerStore.commonData)
const {specialization, address} = toRefs(registerStore.additionalTrainerData)

const avatarShow = ref('')

const readSrc = (evt) => {
  const file = evt.target.files[0];

  if (file) {
    avatar.value = file;
    const reader = new FileReader();

    reader.onload = () => {
        avatarShow.value = reader.result;
    }

    reader.readAsDataURL(file);
  }
};

</script>

<style lang="scss" scoped>
.registration {
    flex: auto;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;

    input {
        width: 80%;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #e5e5e5;
        color: rgb(216, 216, 216);
        font-size: 18px;
        padding: 3px 5px 3px 5px;

        &:focus-visible {
            outline: none;
        }
    }

    span {
        display: block;
        color: rgb(216, 216, 216);
        font-size: 18px;
        margin-bottom: 15px;
    }

    &__container {
        width: fit-content;
        height: auto;
        padding: 35px;
        background-color: rgb(53, 53, 53);
        border-radius: 8px;
        box-shadow: 7px 7px 17px 6px rgba(0, 0, 0, 0.2);
        margin: 10% 0;
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
        background-color: #c7c7c7;
        border: none;
        border-radius: 10px;
        color: black;
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
            color: rgb(216, 216, 216);
            font-size: 20px;
            padding: 3px 5px 3px 5px;
            border: 1px solid rgb(216, 216, 216);
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
</style>
