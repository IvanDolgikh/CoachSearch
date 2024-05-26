<template>
    <div class="logo">
        <div class="logo__container">

            <router-link class="logo__link"
                to="/">
                <IconLogo />
            </router-link>


        </div>
    </div>
</template>

<script lang="ts"
    setup>

    import IconLogo from "@icons-svg/icon-logo.svg"
</script>

<style lang="scss"
    scoped>
    .logo {
        &__container {
            width: fit-content;
        }

        &__link {
            display: block;
            width: 60px;
            height: 60px;

            @include vp-1199 {
                width: 46px;
                height: 46px;
            }

            @include vp-767 {
                width: 36px;
                height: 36px;
            }
        }
    }
</style>