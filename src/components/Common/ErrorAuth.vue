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


            &::before {
                content: "";
                position: absolute;
                bottom: 20%;
                left: 50%;
                transform: translateX(-50%);
                width: 20px;
                height: 300px;
                background-color: red;
                animation: border 5s linear infinite;
                transform-origin: bottom center;
            }

            &::after {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 99.5%;
                height: 98%;
                background-color: $color-base-white;
                border-radius: 8px;
            }

            @keyframes border {
                0% {
                    transform: translateX(-50%) rotate(360deg);
                }

                100% {
                    transform: translateX(-50%) rotate(0deg);
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