<template>
    <div class="gyms">
        <div class="gyms__logo-container">
            <Logo class="gyms__logo" />
        </div>
        <div class="gyms__container">
            <Map></Map>
        </div>

        <ErrorGetData v-if="errorsStore.errorGettingData" />
    </div>
</template>


<script setup
    lang="ts">

    import ErrorGetData from "../Common/ErrorGetData.vue";
    import Map from '../Lib/Map.vue';
    import Logo from '../Common/Logo.vue'

    import { getData, baseUrl } from '@api/api.js'
    import { initMap } from '@api/apiMap.js'
    import { onMounted } from 'vue';
    import { useCoordsStore } from '../../store/coordsStore'
    import { usePreloaderStore } from '../../store/preloaderStore';
    import { useErrorsStore } from "../../store/errorsStore";

    const coordsStore = useCoordsStore()
    const preloaderStore = usePreloaderStore();
    const errorsStore = useErrorsStore()

    const APIKEY: string = 'b9792c26-9b3a-42d8-a4f6-5160e8801ffc';

    const urlAllAddress: string = `${baseUrl}api/coach/addresses`

    type TgetCoordsForAddress = (address: string) => Promise<number[] | undefined>

    const getCoordsForAddress: TgetCoordsForAddress = async (address) => {

        try {
            const urlAddress: string = `https://geocode-maps.yandex.ru/1.x/?apikey=${APIKEY}&format=json&geocode=${address}`;

            const response: any = await fetch(urlAddress)
            if (response.ok) {
                const data: any = await response.json()
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
                const coords: number[] | undefined = await getCoordsForAddress(address);
                if (coords !== undefined) {
                    allCoords.push(coords)
                }
            }
            return allCoords

        } catch (error) {
            console.log('Ошибка при получении координат:', error)
        }
    }

    interface IAddresses {
        addresses: string[]
    }

    const getGymsList = async (): Promise<void> => {
        try {
            const result: IAddresses = await getData(urlAllAddress)
            coordsStore.address = result.addresses
            const coords: number[][] | undefined = await getAllCoords()
            initMap(coords)
        } catch (error: any) {
            errorsStore.showAndHideGettingDataError()
        }
    }

    onMounted(async (): Promise<void> => {
        preloaderStore.loading = true
        await getGymsList()
        preloaderStore.loading = false
    })

</script>

<style lang="scss"
    scoped>
    .gyms {
        flex-grow: 1;

        &__logo-container {
            width: 100%;
            border-bottom: 1px solid $color-gray-lighter;
            margin-bottom: 60px;
            padding: 15px 100px;

            @include vp-1199 {
                margin-bottom: 40px;
                padding: 10px 60px;
            }

            @include vp-767 {
                margin-bottom: 30px;
                padding: 8px 20px;
            }
        }

        &__logo {
            width: fit-content;
            margin-left: auto;
        }

        &__container {
            max-width: 1440px;
            margin: 6% auto 10% auto;
            padding: 0 80px;
            width: 98%;
            height: fit-content;

            @include vp-1199 {
                padding: 0 60px;
            }

            @include vp-767 {
                padding: 0 20px;
            }
        }
    }
</style>