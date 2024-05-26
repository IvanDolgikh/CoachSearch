<template>
    <div class="like">
        <div class="like__container">
            <span class="pi pi-exclamation-triangle"></span>
            <p>У вас нет возможности поставить лайк, так как вы тренер</p>
        </div>
    </div>
</template>

<script lang="ts"
    setup>
</script>

<style lang="scss"
    scoped>

    .like {

        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        background-color: #0000007d;
        overflow-y: auto;

        &__container {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -40%);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px 25px;
            border-radius: 8px;
            background-color: $color-base-white;
            width: 300px;

            @include vp-767 {
                width: 250px;
            }
        }

        span {
            display: block;
            font-size: 30px;
            color: $color-accent;
            margin-bottom: 14px;
            z-index: 2;

            @include vp-1199 {
                font-size: 26px;
                margin-bottom: 12px;
            }
        }

        p {
            text-align: center;
            font-size: 16px;
            font-weight: 500;
            z-index: 2;
            line-height: 1.3;

            @include vp-1199 {
                font-size: 14px;
            }
        }
    }
</style>