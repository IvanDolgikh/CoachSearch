<template>
    <div class="error-auth">
        <div class="error-auth__container">
            <span class="pi pi-exclamation-triangle"></span>
            <p>Введен неверно логин или пароль</p>
        </div>
    </div>
</template>

<script lang="ts"
    setup>

</script>


<style lang="scss"
    scoped>

    @import "@variables";

    .error-auth {
        &__container {
            display: flex;
            align-items: center;
            column-gap: 15px;
            position: relative;
            padding: 15px 25px;
            border-radius: 8px;
            background-color: $color-base-white;
            overflow: hidden;

            @include vp-767 {
                padding: 10px 20px;
            }

            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 400px;
                background-color: red;
                animation: border 10s linear infinite;
            }

            &::after {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 97%;
                background-color: $color-base-white;
                border-radius: 8px;
            }

            @keyframes border {
                0% {
                    transform: translate(-50%, -50%) rotate(360deg);
                }

                100% {
                    transform: translate(-50%, -50%) rotate(0deg);
                }
            }
        }

        span {
            display: block;
            font-size: 20px;
            color: $color-accent;
            z-index: 2;

            @include vp-1199 {
                font-size: 18px;
            }

            @include vp-767 {
                font-size: 16px;
            }
        }

        p {
            font-weight: 400;
            font-size: 14px;
            z-index: 2;

            @include vp-1199 {
                font-size: 12px;
            }

            @include vp-767 {
                font-size: 10px;
            }

        }
    }
</style>