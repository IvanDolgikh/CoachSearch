<template>

    <div class="preloader">
        <div class="preloader__container">
            <ProgressSpinner class="preloader__circle"
                strokeWidth="3"
                aria-label="Loading" />
            <p class="preloader__title">Минутку, я думаю...</p>
        </div>
    </div>

</template>

<script lang="ts"
    setup>
    import ProgressSpinner from 'primevue/progressspinner';
</script>

<style lang="scss"
    scoped>
    .preloader {

        &__container {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__circle {
            width: 120px;
            height: 120px;

            @include vp-1199 {
                width: 100px;
                height: 100px;
            }

            @include vp-767 {
                width: 80px;
                height: 80px;
            }
        }

        &__title {
            margin-top: 20px;
            font-size: 26px;

            @include vp-1199 {
                font-size: 24px;
            }

            @include vp-767 {
                font-size: 20px;
            }
        }
    }

    .p-progress-spinner-circle {
        animation: p-progress-spinner-dash 1.5s ease-in-out infinite;
    }
</style>