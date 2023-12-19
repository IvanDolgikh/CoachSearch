<template>
    <div class="map-container">
        <div class="map-container__map" id="map"></div>
    </div>
</template>


<script setup>

import { ref, reactive } from 'vue'
let myPlacemark = null;
let map = null;

let arr = reactive([56.845694374932386, 60.62562034559347])

ymaps.ready(function(){

  map = new ymaps.Map("map", {
    center: arr,
    zoom: 10
  });

	
  myPlacemark = new ymaps.Placemark(arr, {}, {
    preset: 'islands#redIcon'
  });

  map.geoObjects.add(myPlacemark); 

  map.controls.remove('trafficControl');
  map.controls.remove('typeSelector');
  map.controls.remove('rulerControl');
  map.controls.remove('fullscreenControl');
}); 

</script>


<style lang="scss">
.map-container{

    &__map{
        width: 100%;
        height: 500px;
        border-radius: 10px;
        overflow: auto;
    }
}    
</style>