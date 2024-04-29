<template>
    <div class="error-reg">
        <div class="error-reg__container">
            <span class="pi pi-exclamation-triangle"></span>
            <p v-if="errorsStore.errorPhoneReg">Пользователь с таким телефоном уже существует</p>
            <p v-if="errorsStore.errorEmailReg">Пользователь с таким email уже существует</p>
        </div>
    </div>
</template>

<script lang="ts"
    setup>

    import { useErrorsStore } from '../../store/errorsStore';

    const errorsStore = useErrorsStore()
</script>


<style lang="scss"
    scoped>

    @import "@variables";

    .error-reg {
        &__container {
            display: flex;
            align-items: center;
            column-gap: 15px;
            position: relative;
            padding: 15px 25px;
            border-radius: 8px;
            background-color: $color-base-white;
            overflow: hidden;

            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 500px;
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
            color: $color-gray-lighter;
            color: $color-accent;
            z-index: 2;
        }

        p {
            font-size: 14px;
            z-index: 2;
        }
    }
</style>