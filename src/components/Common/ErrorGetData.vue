<template>
    <div class="error-data">
        <div class="error-data__container">
            <span class="pi pi-exclamation-triangle"></span>
            <p>Проблемы с ответом от сервера. Пожалуйста перезагрузите страницу или войдите позже</p>
        </div>
    </div>
</template>

<script lang="ts"
    setup>

</script>


<style lang="scss"
    scoped>

    @import "@variables";

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