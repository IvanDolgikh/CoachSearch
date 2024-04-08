<template>
    <div class="authorization">
        <div class="authorization__container">
            <p class="authorization__title">Добро пожаловать в<br> CoachSearch</p>
            <form class="authorization__form"
                method="post"
                @submit.prevent="authStore.sendDataAuth()">
                <label class="authorization__label">
                    <span>Логин</span>
                    <input type="text"
                        name="Login"
                        v-model="authStore.login">
                </label>

                <label class="authorization__label">
                    <span>Пароль</span>
                    <input type="password"
                        name="Password"
                        v-model="authStore.password">
                </label>

                <button class="authorization__button">Войти</button>
            </form>
            <RouterLink to="/registration"
                class="authorization__question">Нет аккаунта?</RouterLink>

            <transition name="error">
                <ErrorAuth class="authorization__error"
                    v-if="errorsStore.errorAuth" />
            </transition>

        </div>
    </div>
</template>

<script setup
    lang="ts">
    import ErrorAuth from '../Common/ErrorAuth.vue'
    import { useAuthStore } from '../../store/authStore';
    import { useErrorsStore } from '../../store/errorsStore'

    const authStore = useAuthStore()
    const errorsStore = useErrorsStore()

</script>

<style lang="scss"
    scoped>

    @import "@variables";

    .authorization {
        flex: auto;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;

        &__container {
            position: relative;
            width: 600px;
            height: auto;
            padding: 35px;
            background-color: $color-base-white;
            border-radius: 8px;
            box-shadow: 7px 7px 17px 6px rgba(0, 0, 0, 0.2);
        }

        &__title {
            font-size: 26px;
            font-weight: 600;
            color: rgb(51 51 51);
            margin-bottom: 50px;
            text-align: center;
            line-height: 1.4;
        }

        &__label {
            display: block;
            margin-bottom: 30px;

            span {
                display: block;
                margin-bottom: 15px;
                color: rgb(51 51 51);
                font-size: 20px;
                font-weight: 500;
            }

            input {
                width: 100%;
                background-color: transparent;
                border: none;
                border-bottom: 1px solid #333333;
                color: rgb(51, 51, 51);
                font-size: 20px;
                padding: 3px 5px 3px 5px;

                &:focus-visible {
                    outline: none;
                }
            }
        }

        &__button {
            display: block;
            background-color: #474747;
            border: none;
            border-radius: 10px;
            color: rgb(255 255 255);
            padding: 6px 30px;
            margin: 0 auto;
            cursor: pointer;
            margin-bottom: 28px;
            width: 100%;
        }

        &__question {
            color: rgb(51, 51, 51);
            font-size: 15px;
            font-weight: 400;
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

    .error-enter-active,
    .error-leave-active {
        transition: opacity 0.2s ease;
    }

    .error-enter-from,
    .error-leave-to {
        opacity: 0;
    }
</style>