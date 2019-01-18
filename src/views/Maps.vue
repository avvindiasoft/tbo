<template>
  <div class="mapouter">
    <div class="gmap_canvas">
      <div id="app">
        <yandex-map
          :coords="[58.0043, 56.2196]"
          zoom="14"
          style="width: 100%; height: 100%;"
          :cluster-options="{
            1: {clusterDisableClickZoom: true}
           }"
          :behaviors="['scrollZoom', 'drag']"
          :controls="['zoomControl']"
          :placemarks="placemarks"
          map-type="map"
          @map-was-initialized="initHandler"
        >
          <!--
                   <ymap-marker
                     marker-type="placemark"
                     :coords="[57.99390, 56.20500]"
                     :color="red"
                     hint-content="Кронштадская, 88-90"
                     :balloon="{header: 'Кронштадская, 88-90', body: 'Бак заполнен на 90%', footer: ''}"
                     :icon="{color: 'green', glyph: 'trash'}"
                     :marker-fill="{color: '#000000', opacity: 0.4}"
                     :marker-stroke="{color: '#ff0000', width: 5}"
                     cluster-name="1"
                   ></ymap-marker>
                     -->

          <!--
                  <ymap-marker
                    marker-type="placemark"
                    :coords="[57.99390, 56.20500]"
                    hint-content="Hint content 1"
                    :balloon="{header: 'header', body: 'body', footer: 'footer'}"
                    :icon="{color: 'green', glyph: ''}"
                    cluster-name="1"
                  ></ymap-marker>
                    <!--
                            <ymap-marker
                              marker-type="circle"
                              :coords="[54.62896654088406, 39.731893822753904]"
                              circle-radius="1600"
                              hint-content="Hint content 1"
                              :marker-fill="{color: '#000000', opacity: 0.4}"
                              :marker-stroke="{color: '#ff0000', width: 5}"
                              :balloon="{header: 'header', body: 'body', footer: 'footer'}"
                            ></ymap-marker>
          -->
        </yandex-map>
      </div>
    </div>
  </div>
</template>

<style>
  .mapouter {
    text-align:right;
    height:100%;
    width:100%;
    position: absolute;
  }
  .gmap_canvas {
    overflow:hidden;
    background:none!important;
    height:100%;
    width:100%;
  }
</style>

<style>
  #app,
  #mymap {
    position: relative;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>



<script>
  import { yandexMap, ymapMarker } from 'vue-yandex-maps'

  export default {
    components: { yandexMap, ymapMarker },
    data() {
      let icons = {
        green: {
          iconLayout: 'default#image',
          iconImageSize: [30, 30],
          iconImageHref: 'http://localhost:8080/img/marker-trash-icon-green.png'
        },
        red: {
          iconLayout: 'default#image',
          iconImageSize: [30, 30],
          iconImageHref: 'http://localhost:8080/img/marker-trash-icon-red.png'
        },
        blue:  {
          iconLayout: 'default#image',
          iconImageSize: [30, 30],
          iconImageHref: 'http://localhost:8080/img/marker-trash-icon-blue.png'
        }
      }
      return {
        placemarks: [
          {
            coords: [57.980860, 56.218950],
            properties: {}, // define properties here
            options: icons.green, // define options here
            clusterName: "1",
            callbacks: { click: function() {} },
          },
          {
            coords: [57.983273, 56.219478],
            properties: {}, // define properties here
            options: icons.red, // define options here
            clusterName: "1",
            callbacks: { click: function() {} }
          },
          {
            coords: [57.984047, 56.213418],
            properties: {}, // define properties here
            options: icons.red, // define options here
            clusterName: "1",
            callbacks: { click: function() {} }
          },
          {
            coords: [57.986103, 56.213866],
            properties: {}, // define properties here
            options: icons.blue, // define options here
            clusterName: "1",
            callbacks: { click: function() {} }
          },
          {
            coords: [57.986055, 56.217312],
            properties: {}, // define properties here
            options: icons.red, // define options here
            clusterName: "1",
            callbacks: { click: function() {} }
          },
          {
            coords: [57.980383, 56.216053],
            properties: {}, // define properties here
            options: icons.red, // define options here
            clusterName: "1",
            callbacks: { click: function() {} }
          },
          {
            coords: [57.978426, 56.215392],
            properties: {}, // define properties here
            options: icons.red, // define options here
            clusterName: "1",
            callbacks: { click: function() {} }
          },
          {
            coords: [57.976974, 56.210405],
            properties: {}, // define properties here
            options: icons.red, // define options here
            clusterName: "1",
            callbacks: { click: function() {} }
          },
          {
            coords: [57.975487, 56.211732],
            properties: {}, // define properties here
            options: icons.blue, // define options here
            clusterName: "1",
            callbacks: { click: function() {} }
          },
          {
            coords: [57.977269, 56.215230],
            properties: {}, // define properties here
            options: icons.green, // define options here
            clusterName: "1",
            callbacks: { click: function() {} }
          }
        ]
      }
    }
  }
</script>


