<template>
    <header class="main-header">
        <div class="main-header__container">
            <div class="main-header__authorized-container">
                <Logo class="main-header__logo-link" />
                <router-link v-if="!checkUserStatus"
                    class="main-header__link-authorization"
                    to="/authorization">Войти</router-link>
            </div>
        </div>
    </header>
</template>

<script setup
    lang="ts">
    import { ref, computed } from "vue";
    import { useRoute } from "vue-router";

    import Logo from "../Common/Logo.vue";

    const router = useRoute();

    const checkUserStatus = computed<boolean>(() => {
        const isAuthorizedUser = ref<boolean>(localStorage.getItem("isAuthorizedUser") === "true");
        const isAuthorizedPath: boolean = router.matched.some((direct) => direct.name === "authorized-user");
        if (isAuthorizedUser && isAuthorizedPath) {
            return true;
        } else {
            return false;
        }
    });
</script>

<style scoped
    lang="scss">

    .main-header {
        &__container {
            max-width: $max-width-ds;
            margin: 0 auto;
            padding: 20px 100px;

            @include vp-1199 {
                padding: 14px 60px;
            }

            @include vp-767 {
                padding: 14px 20px;
            }
        }

        &__anauthorized-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__logo-link {
            display: block;
            width: fit-content;
        }

        &__link-authorization {
            display: block;
            font-weight: 400;
            color: $color-base-text;
            font-size: 18px;
            border: 1px solid $color-gray-lighter;
            border-radius: 18px;
            padding: 10px 40px;
            transition: border 0.2s;

            &:hover,
            &:focus-visible {
                border-color: $color-accent;
                transition: border 0.2s
            }

            &:active {
                border-color: $color-accent-middle;
            }

            @include vp-1199 {
                font-size: 14px;
            }

            @include vp-767 {
                font-size: 12px;
                padding: 6px 30px;
            }
        }

        &__authorized-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
