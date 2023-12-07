<template>
    <header class="main-header">
        <div class="main-header__container">
            <Promo></Promo>
        </div>
    </header>
</template>



<script setup>
import Promo from './HeaderPromo.vue'

</script>



<style lang="scss">

.main-header {

    &__container {
        position: relative;
    }
}

// .bubble {
//     position: absolute;
//     top: 5%;
//     left: -5%;
//     width: 200px;
//     height: 200px;
//     transform: rotate(8deg);
//     flex-shrink: 0;
//     border-radius: 50%;
//     background: linear-gradient(118deg, rgba(255, 255, 255, 0.2) 9%, rgba(0, 0, 0, 0) 60%);
//     background-blend-mode: overlay;
//     box-shadow: 17px 15px 40px 0px rgba(0, 0, 0, 0.55), 27px 12px 27px 16px rgba(0, 0, 0, 0.5) inset, -15px -12px 27px 0px rgba(255, 255, 255, 0.5) inset;
//     animation: floatAnimation 5s infinite;
// }

</style>