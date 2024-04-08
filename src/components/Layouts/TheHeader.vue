<template>
    <header class="main-header">
        <div class="main-header__container">
            <div class="main-header__anauthorized-container">
                <router-link class="main-header__logo-link"
                    to="/">
                    <img width="60"
                        height="60"
                        src="../../assets/images/svg/icon-logo.svg"
                        alt="Логотп CoachSearch" />
                </router-link>

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
    @import "@variables";

    .main-header {
        &__container {
            max-width: $max-width-ds;
            margin: 0 auto;
            padding: 20px 100px;
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
        }

        &__authorized-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__authorized-list {
            display: flex;
            column-gap: 40px;
        }

        &__authorized-link {
            font-size: 20px;
            color: $color-base-text;
        }
    }
</style>
