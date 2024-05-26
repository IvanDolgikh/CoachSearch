<template>
    <div class="main-user">
        <div class="main-user__container">

            <div class="main-user__menu"
                :class="{ 'main-user__menu--active': isActiveMenu }">
                <button class="main-user__burger"
                    @click="isActiveMenu = !isActiveMenu">
                    <span class="pi pi-times"
                        v-if="isActiveMenu"></span>
                    <span class="pi pi-bars"
                        v-else></span>
                </button>
                <ul class="main-user__list"
                    @click="goToPage($event)">
                    <li class="main-user__item">
                        <router-link class="main-user__link"
                            :to="checkedRole">
                            <span class="pi pi-user"></span>
                            Личный кабинет
                        </router-link>
                    </li>
                    <li class="main-user__item">
                        <router-link class="main-user__link"
                            :to="{ name: 'coaches' }">
                            <span class="pi pi-users"></span>
                            Тренеры
                        </router-link>
                    </li>
                    <li class="main-user__item">
                        <router-link class="main-user__link"
                            :to="{ name: 'gyms-list' }">
                            <span class="pi pi-list"></span>
                            Залы
                        </router-link>
                    </li>
                    <li class="main-user__item">
                        <button class="main-user__link"
                            @click="logOutProfile">
                            <span class="pi pi-sign-out"></span>
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
    const router = useRouter();

    const isActiveMenu = ref<boolean>(false)

    const goToPage = (e: Event) => {
        const target: HTMLElement = e.target as HTMLElement;
        if (target.className.includes('main-user__link')) {
            isActiveMenu.value = !isActiveMenu.value
        }
    }

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

    .main-user {
        &__container {
            display: grid;
            grid-template-columns: auto 1fr;

            @include vp-767 {
                display: flex;
            }
        }

        &__menu {
            grid-column: 1;
            background-color: $color-dark;
            padding: 110px 30px;
            min-height: calc(100vh - 142px);
            overflow: hidden;

            @include vp-1199 {
                width: 66px;
                padding: 32px 22px;
                min-height: calc(100vh - 126px);
                transition: width 0.2s ease;
            }

            @include vp-767 {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                width: 0;
                padding: 0;
                background-color: rgba(0, 0, 0, 0.8);
                transition: none;
            }
        }

        &__list {
            display: flex;
            flex-direction: column;
            gap: 50px;

            @include vp-1199 {
                gap: 40px;
            }

            @include vp-767 {
                margin-top: 30%;
                align-items: center;
            }
        }

        &__burger {
            display: none;
            border: none;
            background-color: transparent;
            padding: 0;
            margin-bottom: 60px;
            cursor: pointer;

            @include vp-1199 {
                display: block;
            }

            @include vp-767 {
                position: absolute;
                top: 2vh;
                left: 5vw;
                transition: 0.4s;
            }

            span {
                font-size: 24px;
                color: $color-base-white;

                @include vp-767 {
                    color: $color-base-text;
                }
            }

            &:focus-visible {
                outline: none;
            }
        }

        &__link {
            display: flex;
            align-items: center;
            column-gap: 22px;
            font-family: "Montserrat", sans-serif;
            font-weight: 300;
            padding: 0;
            background-color: transparent;
            border: none;
            font-size: 20px;
            color: $color-base-white;
            cursor: pointer;

            span {
                display: block;
                font-size: 22px;
                color: $color-accent;
            }

            @include vp-1199 {
                font-size: 18px;
                text-wrap: nowrap;
            }

            @include vp-767 {
                padding: 0 16px 6px 16px;
                border-bottom: 1px solid $color-accent;

                span {
                    display: none;
                }
            }
        }

        &__menu--active {
            @include vp-1199 {
                width: 244px;
                transition: width 0.2s ease;
            }

            @include vp-767 {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                transition: none;
                z-index: 1;

                .main-user__burger {
                    left: 80%;
                    transition: 0.4s;

                    span {
                        color: white;
                    }
                }
            }
        }
    }

</style>
