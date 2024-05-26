const cityCoords = [56.8519, 60.6122]

let myPlacemark = null;
let map = null;

const initMap = async(array) => {
    ymaps.ready(function () {

        map = new ymaps.Map("map", {
            center: cityCoords,
            zoom: 10
        });

        if(array.length === 2) {
            myPlacemark = new ymaps.Placemark(array, {}, {
                preset: 'islands#redIcon'
            });
    
            map.geoObjects.add(myPlacemark);
        } else {
            for (let i = 0; i < array.length; ++i) {
                const pl = new ymaps.Placemark(array[i], {}, {
                    preset: 'islands#redIcon'
                });
                map.geoObjects.add(pl);
            }
        }
        map.container.fitToViewport()
        map.controls.remove('trafficControl');
        map.controls.remove('typeSelector');
        map.controls.remove('rulerControl');
        map.controls.remove('fullscreenControl');
    });
}

export { initMap }