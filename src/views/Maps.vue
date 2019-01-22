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

                   <ymap-marker
                     marker-type="placemark"
                     :coords="[57.986220, 56.242261]"
                     :color="red"
                     hint-content="Кронштадская, 88-90"
                     :draggable="true"
                     :balloon="{header: 'Кронштадская, 88-90', body: 'Бак заполнен на 90%', footer: ''}"
                     :icon="{color: 'green', glyph: 'trash'}"
                     :marker-fill="{color: '#000000', opacity: 0.4}"
                     :marker-stroke="{color: '#ff0000', width: 5}"
                     cluster-name="1"
                   ></ymap-marker>

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
  import store from '@/store'

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
          iconImageHref: 'http://localhost:8080/img/marker-trash-icon-blue.png',
          iconGlyph: 'home',
        }
      }

      let markers = store.state.markers
      let placemarks = []

      markers.forEach(function(marker) {
        let placemark = {
          coords: marker.coords,
          properties: {
            marker: marker,
            getIcon: function() {
              return this.marker.percent > 75
                ? icons.red
                : marker.percent > 35
                  ? icons.blue
                  : icons.green
            }
          },
          options: {},
          clusterName: "1",
          callbacks: { click: function() {} }
        }
        placemark.options = placemark.properties.getIcon()
        placemarks.push(placemark)
      })

      return {
        placemarks
      }
    },

    mounted() {

    }
  }
</script>


