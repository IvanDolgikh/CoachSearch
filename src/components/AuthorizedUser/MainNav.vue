<template>
    <div class="main-nav">
        <div class="main-nav__container">
             <RouterLink class="main-nav__link-container" :to="{name: 'gyms'}">
                <svg width="26" height="30" viewBox="0 0 68 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M63.6141 33.807C63.6141 50.2691 33.807 78.5176 33.807 78.5176C33.807 78.5176 4 50.2691 4 33.807C4 17.3451 17.3451 4 33.807 4C50.2691 4 63.6141 17.3451 63.6141 33.807Z" fill="white" stroke="black" stroke-width="7"/>
                    <path d="M33.7259 37.5328C35.7837 37.5328 37.4518 35.8647 37.4518 33.8069C37.4518 31.7492 35.7837 30.0811 33.7259 30.0811C31.6681 30.0811 30 31.7492 30 33.8069C30 35.8647 31.6681 37.5328 33.7259 37.5328Z" fill="white" stroke="black" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Залы</span>
             </RouterLink>
             <RouterLink class="main-nav__link-container" :to="checkRole">
                <svg width="30" height="26" viewBox="0 0 83 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 26.5278L41.5 3L80 26.5278" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M71.4436 41.5V68.8778C71.4436 70.2954 70.2946 71.4444 68.8769 71.4444H14.1214C12.7038 71.4444 11.5547 70.2954 11.5547 68.8778V41.5" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
             </RouterLink>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue'

const role = localStorage.getItem('role');

const checkRole = computed(() => {
     if(role === 'Customer') {
        return {name: 'lkuser'}
     } else {
        return {name: 'lkcoach'}
     }
})


</script>


<style lang="scss">
    .main-nav {
        &__container {
            display: flex;
            justify-content: space-between;
            max-width: 1440px;
            margin: 0 auto;
            padding: 40px 80px 0 80px;
        }

        &__link-container {
            display: flex;
            column-gap: 15px;
            span {
                display: block;
                color: rgb(216, 216, 216);
                text-transform: uppercase;
                font-size: 26px;
            }
        }
    }
</style>