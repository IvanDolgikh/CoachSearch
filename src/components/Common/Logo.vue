<template>
    <div class="logo">
        <div class="logo__container">

            <router-link class="logo__link"
                to="/">
                <img width="60"
                    height="60"
                    src="../../assets/images/svg/icon-logo.svg"
                    alt="Логотп CoachSearch" />
            </router-link>


        </div>
    </div>
</template>

<script lang="ts"
    setup>
</script>

<style lang="scss"
    scoped>
    .logo {
        &__container {
            width: fit-content;
            margin-left: auto;
        }
    }
</style>