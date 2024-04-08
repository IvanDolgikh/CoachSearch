<template>
    <div class="main-user">
        <div class="main-user__container">
            <div class="main-user__menu">
                <ul class="main-user__list">
                    <li class="main-user__item">
                        <router-link class="main-user__link"
                            :to="checkedRole">Личный кабинет</router-link>
                    </li>
                    <li class="main-user__item">
                        <router-link class="main-user__link"
                            :to="{ name: 'coaches' }">Тренеры</router-link>
                    </li>
                    <li class="main-user__item">
                        <router-link class="main-user__link"
                            :to="{ name: 'gyms' }">Залы</router-link>
                    </li>
                    <li class="main-user__item">
                        <button class="main-user__link"
                            @click="logOutProfile">
                            Выход
                        </button>
                    </li>
                </ul>
            </div>


            <RouterView></RouterView>

        </div>
    </div>
</template>

<script setup
    lang="ts">
    import { ref } from "vue";
    import { useAuthStore } from "../../store/authStore";
    import { useRouter } from 'vue-router'

    const authStore = useAuthStore();
    const router = useRouter()

    const role: string = localStorage.getItem("role") || "";

    type TProfile = {
        name: string
    }

    const checkedRole = ref<TProfile>(authStore.checkRole(role));

    const logOutProfile = () => {
        localStorage.clear()
        router.push('/')
    }
</script>

<style lang="scss"
    scoped>
    @import "@variables";

    .main-user {
        &__container {
            display: grid;
            grid-template-columns: auto 1fr;
        }

        &__menu {
            grid-column: 1;
            background-color: rgb(219 219 219);
            padding: 70px 80px;
            min-height: calc(100vh - 104px);
        }

        &__list {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }

        &__link {
            font-family: "Montserrat", sans-serif;
            color: #4d4d4d;
            font-weight: 300;
            padding: 0;
            background-color: transparent;
            border: none;
            font-size: 24px;
            color: $color-base-text;
            cursor: pointer;
        }


    }
</style>
