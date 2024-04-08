<template>
    <div class="map">
        <div class="map__container">
            <Map></Map>
        </div>
    </div>
</template>


<script setup
    lang="ts">
    import Map from '../Lib/Map.vue';
    import { getData, baseUrl } from '@api/api.js'
    import { initMap } from '@api/apiMap.js'
    import { onMounted } from 'vue';
    import { useCoordsStore } from '../../store/coordsStore'

    const coordsStore = useCoordsStore()

    const APIKEY: string = 'b9792c26-9b3a-42d8-a4f6-5160e8801ffc';

    const urlAllAddress: string = `${baseUrl}api/trainer/addresses`

    type TgetCoordsForAddress = (address: string) => Promise<number[] | undefined>

    const getCoordsForAddress: TgetCoordsForAddress = async (address) => {
        try {
            const urlAddress: string = `https://geocode-maps.yandex.ru/1.x/?apikey=${APIKEY}&format=json&geocode=${address}`;
            const response = await fetch(urlAddress)
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                const coordinates: string[] = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                return [Number(coordinates[1]), Number(coordinates[0])]
            }
        } catch (error) {
            console.log('Ошибка при получении координат по адресу:', address)
        }
    }

    type TGetAllCoords = () => Promise<number[][] | undefined>


    const getAllCoords: TGetAllCoords = async () => {
        try {
            const addresses: string[] = coordsStore.address;
            const allCoords: number[][] = [];

            for (let address of addresses) {
                const coords = await getCoordsForAddress(address);
                if (coords !== undefined) {
                    allCoords.push(coords)
                }
            }

            return allCoords

        } catch (error) {
            console.log('Ошибка при получении координат:', error)
        }
    }

    onMounted(async () => {
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