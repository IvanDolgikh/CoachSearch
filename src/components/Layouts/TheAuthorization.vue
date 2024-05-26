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
                        required
                        v-model="authStore.login">
                </label>

                <label class="authorization__label">
                    <span>Пароль</span>
                    <input type="password"
                        name="Password"
                        required
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
            padding: 34px;
            background-color: $color-base-white;
            border-radius: 8px;
            box-shadow: 7px 7px 17px 6px rgba(0, 0, 0, 0.2);

            @include vp-1199 {
                width: 500px;
                padding: 24px;
            }

            @include vp-767 {
                width: 360px;
            }
        }

        &__title {
            font-size: 26px;
            font-weight: 600;
            margin-bottom: 50px;
            text-align: center;
            line-height: 1.4;

            @include vp-1199 {
                font-size: 22px;
                margin-bottom: 40px;
            }

            @include vp-767 {
                font-size: 18px;
            }
        }

        &__label {
            display: block;
            margin-bottom: 30px;

            span {
                display: block;
                margin-bottom: 15px;
                font-size: 20px;
                font-weight: 500;

                @include vp-1199 {
                    font-size: 18px;
                }

                @include vp-767 {
                    font-size: 16px;
                }
            }

            input {
                width: 100%;
                background-color: transparent;
                border: none;
                border-bottom: 1px solid $color-dark;
                font-size: 20px;
                padding: 3px 5px 3px 5px;
                transition: border 0.2s;

                @include vp-1199 {
                    font-size: 18px;
                }

                @include vp-767 {
                    font-size: 16px;
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
            transition: background-color 0.2s;

            @include vp-1199 {
                font-size: 16px;
            }

            @include vp-767 {
                font-size: 14px;
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

        &__question {
            font-size: 14px;
            font-weight: 400;

            @include vp-1199 {
                font-size: 12px;
            }

            &:hover,
            &:focus-visible {
                outline: none;
                color: $color-gray-lighter;
            }

            &:active {
                color: $color-gray-lighter;
            }
        }

        &__error {
            position: absolute;
            top: -64px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: fit-content;

            @include vp-767 {
                top: -54px;
            }
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