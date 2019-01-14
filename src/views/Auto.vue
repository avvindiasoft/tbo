<template>
  <div class="mapouter">
    <v-snackbar
      :color="success"
      :bottom="bottom"
      :top="top"
      :left="left"
      :right="right"
      v-model="snackbar"
    >
      <v-icon
        color="white"
        class="mr-3"
      >
        mdi-bell-plus
      </v-icon>
      <div>{{info}}</div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
    </v-snackbar>

    <div class="gmap_canvas">
      <div id="app" ref="map">
        <v-map :zoom=12 :center="initialLocation">
          <v-icondefault></v-icondefault>
          <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
          <v-marker-cluster :options="clusterOptions" @clusterclick="click()">
            <v-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng" :icon="icon">
              <v-popup :content="l.text"></v-popup>
            </v-marker>
            <!--
            <v-marker :lat-lng="[58.00439, 56.23969]" :icon="iconAuto"></v-marker>
            <v-marker :lat-lng="[58.00997, 56.20199]" :icon="iconAuto"></v-marker>
            -->
          </v-marker-cluster>

          <v-marker :key="auto1" :lat-lng="auto11" :icon="iconAuto">
          </v-marker>
        </v-map>
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
  import * as Vue2Leaflet from 'vue2-leaflet';
  import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster';
  import iconUrl from 'leaflet/dist/images/marker-icon.png';
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

  const iconAutoUrl = 'http://localhost:8080/img/kamaz.png';

  function rand(n){
    let max = n + 0.1;
    let min = n - 0.1;
    return Math.random() * (max - min) + min;
  }
  export default {
    components: {
      'v-map': Vue2Leaflet.LMap,
      'v-tilelayer': Vue2Leaflet.LTileLayer,
      'v-icondefault': Vue2Leaflet.LIconDefault,
      'v-marker': Vue2Leaflet.LMarker,
      'v-popup': Vue2Leaflet.LPopup,
      'v-marker-cluster': Vue2LeafletMarkercluster
    },
    methods: {
      click: function (e) {
        //alert("clusterclick")
      },
      moveAutoPlus: function(a, b){
        return (a <= b) ? a + 0.0009 : a;
      },
      moveAutoMinus: function(a, b){
        return (a >= b) ? a - 0.0009 : a;
      }

    },
    data () {
      let locations = [];
      let alret = true;
      for (let i = 0; i < 28; i++) {
        locations.push({
          id: i,
          latlng: Vue2Leaflet.L.latLng(rand(58.0043), rand(56.2396)),
          text: 'Контейнер №' + i
        })
      }

      //test
      const obj = {
        28: [58.00439, 56.23969],
        29: [58.00997, 56.20199],
      };

      for(let i in obj){
        locations.push({
          id: i,
          latlng: Vue2Leaflet.L.latLng(obj[i][0], obj[i][1]),
          text: 'Контейнер №' + i
        })
      }

      let icon = Vue2Leaflet.L.icon(Object.assign({},
        Vue2Leaflet.L.Icon.Default.prototype.options,
        {iconUrl, shadowUrl}
      ))

      let iconAuto = L.icon({
        iconUrl: iconAutoUrl,
      })

      return {
        locations,
        icon,
        iconAuto,
        clusterOptions: {},
        initialLocation: Vue2Leaflet.L.latLng(58.0043, 56.2396),
        auto11: [locations[28].latlng.lat, locations[28].latlng.lng],
        auto12: [locations[29].latlng.lat, locations[29].latlng.lng],
        snackbar: false,
        info: null
      }
    },

    mounted() {
      const a = this.auto11[0];
      const b = this.auto12[0];
      const c = this.auto11[1];
      const d = this.auto12[1];

      const interval = () => {
        this.auto11 = [this.moveAutoPlus(this.auto11[0], this.auto12[0]), this.moveAutoMinus(this.auto11[1], this.auto12[1])];

        if(this.auto11[0] >= b && this.auto11[1] <= d){
          //alert('stop');
          clearInterval(intervalId);
          this.info = 'Автомобиль №1 добрался до контейнера №29';
          this.snackbar = true;
        }
      }
      const intervalId = setInterval(interval,1000);

      setTimeout(() => {
        console.log('done')
        this.$nextTick(() =>{
          this.clusterOptions = { disableClusteringAtZoom: 20 }
        });
      }, 5000);
    }
  }
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
  html, body {
    height: 100%;
    margin: 0;
  }
</style>