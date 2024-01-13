<template>
    <div class="map">
        <div class="map__container">
            <Map></Map>
        </div>
    </div>
</template>


<script setup>
import Map from '../Lib/Map.vue';
import { getData } from '@api/api.js'
import { initMap } from '@api/apiMap.js'
import { reactive, toRaw, onMounted } from 'vue';
import { useCoordsStore } from '../../store/coordsStore'

const coordsStore = useCoordsStore()

const apiKey = 'b9792c26-9b3a-42d8-a4f6-5160e8801ffc';

const urlAllAddress = 'http://localhost:5161/api/trainer/addresses'

const getCoordsForAddress = async(address) => {
    try {  
        const urlAddress = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${address}`;
        const response = await fetch(urlAddress)
        if (response.ok) {
            const data = await response.json()
            const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            return [Number(coordinates[1]), Number(coordinates[0])]
        }
    } catch (error) {
        console.log('Ошибка при получении координат по адресу:', address)
    }
}

const getAllCoords = async() => {
    try{
        const addresses = coordsStore.address;
        const allCoords = [];

        for(let address of addresses) {
            const coords = await getCoordsForAddress(address);
            allCoords.push(coords)
        }

        return allCoords

    } catch (error) {
        console.log('Ошибка при получении координат:', error)
    }
}

onMounted(async() => {
    const result = await getData(urlAllAddress)
    coordsStore.address = result.addresses
    
    const coords = await getAllCoords()
    initMap(coords)
})

</script>

<style lang="scss">
.map {
    max-width: 1440px;
    height: 500px;
    margin: 6% auto 10% auto;
    padding: 0 80px;

    &__container {
        height: 500px;
        background-color: transparent;
    }
}

</style>