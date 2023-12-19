<template>
<div class="main">
    <div class="main__container">
        <h1 class="visually-hidden">Coach Search, найди подходящего тренера</h1>
        <img class="main__image" src="../assets/images/promo-image.png" height="400" width="400" alt="Логотип CoachSearch.">
        <div class="main__search-contrainer">
            <img class="main__search-image-1" src="../assets/images/running-woman.png" width="200" height="200" alt="">
            <img class="main__search-image-2" src="../assets/images/mma-man.png" width="200" height="200" alt="">
                <RouterLink :to='goRoute()' class="main__search-button">
                    <img src="../assets/images/button-search-bubble.png" width="200" height="200" alt="">
                </RouterLink>
            <img class="main__search-image-3" src="../assets/images/crossfit-man.png" width="200" height="200" alt="">
        </div>
    </div>

</div>
</template>

<script setup>
import { useBlocksStore } from '../store/store'
import { useRouter } from 'vue-router'

const blocksStore = useBlocksStore()
const router = useRouter()

const goRoute = () => {
    if(!blocksStore.isAuthorizedUser) {
        return '/authorization'
    } else {
        return {name: 'coaches'}
    }
}


</script>

<style lang="scss">
.main {

    &__image {
        display: block;
        margin: 5% auto 5% auto;
    }

    &__search-contrainer {
        width: fit-content;
        margin: 0 auto 10% auto;
        display: grid;
        grid-template-columns: repeat(3, min-content);
        grid-template-rows: repeat(3, min-content);
    }

    &__search-image-1 {
        display: block;
        grid-row: 1;
        grid-column: 1;
        margin-right: -40px;
        margin-bottom: -20px;
    }

    &__search-image-2 {
        display: block;
        grid-row: 1;
        grid-column: 3;
        margin-left: -40px;
        margin-bottom: -20px;
    }

    &__search-image-3 {
        display: block;
        grid-row: 3;
        grid-column: 2;
    }

    &__search-button {
        background-color: transparent;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        grid-row: 2;
        grid-column: 2;
    }
}
</style>
