<template>
    <div class="error-data">
        <div class="error-data__container">
            <span class="pi pi-exclamation-triangle"></span>
            <p>Проблемы с ответом от сервера. Пожалуйста, перезагрузите страницу или войдите позже</p>
        </div>
    </div>
</template>

<script lang="ts"
    setup>

</script>


<style lang="scss"
    scoped>

    .error-data {
        &__container {
            display: flex;
            align-items: center;
            column-gap: 15px;
            padding: 15px 25px;
            border-radius: 8px;
            background-color: $color-base-white;
            width: fit-content;
            margin: 0 auto;
            box-shadow: 2px 4px 18px 0px rgba(0, 0, 0, 0.11);

            @include vp-1199 {
                max-width: 600px;
            }

            @include vp-767 {
                flex-direction: column;
                max-width: 300px;
            }
        }

        span {
            display: block;
            font-size: 26px;
            color: $color-gray-lighter;
            color: $color-accent;
            z-index: 2;

            @include vp-1199 {
                font-size: 24px;
            }

            @include vp-767 {
                font-size: 22px;
                margin-bottom: 12px;
            }
        }

        p {
            font-size: 16px;
            line-height: 1.4;
            font-weight: 500;
            z-index: 2;

            @include vp-1199 {
                font-size: 14px;
            }

            @include vp-767 {
                font-size: 12px;
                text-align: center;
            }
        }
    }
</style>