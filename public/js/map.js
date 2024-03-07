
console.log(mapToken);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style:"mapbox://styles/mapbox/streets-v12",
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

console.log(coordinates);

const marker=new mapboxgl.Marker({color:"red"})
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({offset:25}).setHTML(`<h1>${title}</h1><p>exact location will be provide after booking</P>`))
    .addTo(map);