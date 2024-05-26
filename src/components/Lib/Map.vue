<template>
    <div class="map"
        id="map"></div>
</template>

<script setup>

</script>

<style lang="scss"
    scoped>

    .map {
        height: 500px;
        border-radius: 10px;
        overflow: auto;

        @include vp-1199 {
            height: 340px;
        }

        @include vp-767 {
            height: 260px;
        }
    }
</style>