<template>
    <div class="map">
        <div class="map__container">
            <Map></Map>
        </div>
    </div>
</template>


<script setup>
import Map from '../Lib/Map.vue';
</script>

<style lang="scss">
.map {
    max-width: 1440px;
    height: 500px;
    margin: 6% auto 10% auto;
    padding: 0 80px;

    &__container {
        height: 500px;
        background-color: rgb(0, 74, 20);
    }
}

</style>