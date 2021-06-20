import Head from 'next/head'

const Map = () => {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmxvY2tjaGFpbmVkdXUiLCJhIjoiY2txMzZsNTQxMHZyazMybzdiMm1rdGh0MSJ9.SY1tQfLQXc0ql3WhtdFLnA';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], // starting position
        zoom: 9 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    return (
        <div>
        <Head>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
        </Head>
        <div id="map"></div>
        </div>
    )
}

export default Map