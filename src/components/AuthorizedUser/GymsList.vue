<template>
    <div class="gyms">
        <div class="gyms__logo-container">
            <Logo class="gyms__logo" />
        </div>
        <div class="gyms__container">
            <Map></Map>
        </div>
    </div>
</template>


<script setup
    lang="ts">
    import Map from '../Lib/Map.vue';
    import Logo from '../Common/Logo.vue'

    import { getData, baseUrl } from '@api/api.js'
    import { initMap } from '@api/apiMap.js'
    import { onMounted } from 'vue';
    import { useCoordsStore } from '../../store/coordsStore'
    import { usePreloaderStore } from '../../store/preloaderStore';

    const coordsStore = useCoordsStore()
    const preloaderStore = usePreloaderStore();

    const APIKEY: string = 'b9792c26-9b3a-42d8-a4f6-5160e8801ffc';

    const urlAllAddress: string = `${baseUrl}api/coach/addresses`

    type TgetCoordsForAddress = (address: string) => Promise<number[] | undefined>

    const getCoordsForAddress: TgetCoordsForAddress = async (address) => {

        try {
            const urlAddress: string = `https://geocode-maps.yandex.ru/1.x/?apikey=${APIKEY}&format=json&geocode=${address}`;

            const response = await fetch(urlAddress)
            if (response.ok) {
                const data = await response.json()
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
            const allCoords: number[][] | undefined = [];

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
        preloaderStore.loading = true
        const result = await getData(urlAllAddress)
        coordsStore.address = result.addresses

        const coords = await getAllCoords()
        initMap(coords)
        preloaderStore.loading = false
    })

</script>

<style lang="scss"
    scoped>
    .gyms {
        @import "@variables";

        max-width: 1440px;
        margin: 6% auto 10% auto;
        padding: 0 80px;
        width: 100%;
        height: fit-content;

        &__logo-container {
            width: 100%;
            border-bottom: 1px solid $color-gray-lighter;
            margin: 0 0 60px 0;
            padding: 15px 0 15px 0;
        }

        &__logo {
            max-width: 1440px;
            margin: 0 auto;
        }

        &__container {
            background-color: transparent;
        }
    }
</style>