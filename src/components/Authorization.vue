<template>
<div class="authorization">
    <div class="authorization__container">
        <form class="authorization__form" method="post" @submit.prevent="authStore.sendDataAuth()">
            <label class="authorization__label">
                <span>Логин</span>
                <input type="text" name="Login" v-model="authStore.login">
            </label>

            <label class="authorization__label">
                <span>Пароль</span>
                <input type="password" name="Password" v-model="authStore.password">
            </label>

            <button class="authorization__button">Войти</button>
        </form>
        <RouterLink to="/registration" class="authorization__question">Нет аккаунта?</RouterLink>
    </div>
</div>
</template>

<script setup>
import { useAuthStore } from '../store/authStore';

const authStore = useAuthStore()

</script>

<style lang="scss" scoped>
.authorization {
    flex: auto;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;

    &__container {
        width: 600px;
        height: auto;
        padding: 35px;
        background-color: rgb(53, 53, 53);
        border-radius: 8px;
        box-shadow: 7px 7px 17px 6px rgba(0, 0, 0, 0.2);
    }

    &__label {
        display: block;
        margin-bottom: 30px;

        span {
            display: block;
            margin-bottom: 15px;
            color: rgb(216, 216, 216);
            font-size: 20px;
        }

        input {
            width: 100%;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #e5e5e5;
            color: rgb(216, 216, 216);
            font-size: 20px;
            padding: 3px 5px 3px 5px;

            &:focus-visible {
                outline: none;
            }
        }
    }

    &__button {
        display: block;
        background-color: #c7c7c7;
        border: none;
        border-radius: 10px;
        color: black;
        padding: 5px 30px;
        margin: 0 auto;
        cursor: pointer;
        margin-bottom: 10px;
    }

    &__question {
        color: rgb(216, 216, 216);
        font-size: 15px;
    }
}
</style>
