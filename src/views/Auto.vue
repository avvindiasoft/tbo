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
            <v-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng" :icon="iconMarkers[l.id]">
              <v-popup :content="l.text"></v-popup>
            </v-marker>
            <!--
            <v-marker :lat-lng="[58.00439, 56.23969]" :icon="iconAuto"></v-marker>
            <v-marker :lat-lng="[58.00997, 56.20199]" :icon="iconAuto"></v-marker>
            -->
          </v-marker-cluster>

          <v-marker :key="auto1" :lat-lng="auto11" :icon="iconAuto">
          </v-marker>
          <!--<v-marker :key="auto2" :lat-lng="auto21" :icon="iconAuto">-->
          <!--</v-marker>-->
          <!--<v-marker :key="auto3" :lat-lng="auto31" :icon="iconAuto">-->
          <!--</v-marker>-->
          <!--<v-marker :key="auto4" :lat-lng="auto41" :icon="iconAuto">-->
          <!--</v-marker>-->
          <!--<v-marker :key="auto5" :lat-lng="auto51" :icon="iconAuto">-->
          <!--</v-marker>-->
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
/* eslint-disable */
  import * as Vue2Leaflet from 'vue2-leaflet';
  import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster';
  import iconUrl from 'leaflet/dist/images/marker-icon.png';
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

  import store from '@/store'

  import { mapState } from 'vuex';

  const iconAutoUrl = 'http://localhost:8080/img/kamaz.png';
  const iconMarkersUrl = {
    red: 'http://localhost:8080/img/marker-icon-red.png',
    green: 'http://localhost:8080/img/marker-icon-green.png',
    blue: 'http://localhost:8080/img/marker-icon-blue.png',
    yellow: 'http://localhost:8080/img/marker-icon-yellow.png'
  };

  function rand(n){
    let max = n + 0.1;
    let min = n - 0.1;
    return Math.random() * (max - min) + min;
  }

  function rand2(x, y) {
    let max1 = x + 0.1
    let min1 = x - 0.1
    let max2 = y + 0.1
    let min2 = y - 0.1
    let resultX = Math.random() * (max1 - min1) + min1
    let resultY = Math.random() * (max2 - min2) + min2
    if (resultX < 58.00868 && resultY > 56.13620 && resultX > 57.94960 && resultY < 56.39400 ||
            resultX < 58.07939 && resultY > 56.33888 && resultX > 57.94960 && resultY < 56.39400 ||
            resultX < 58.05815 && resultY > 56.08163 && resultX > 58.03826 && resultY < 56.27152 ||
            resultX < 58.02313 && resultY > 56.27104 && resultX > 57.94960 && resultY < 56.39400 )
      return [resultX, resultY];
    return rand2(x, y);
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
        return (a <= b) ? a + 0.00035 : a;
      },
      moveAutoMinus: function(a, b){
        return (a >= b) ? a - 0.00035 : a;
      },

      moveAuto: function(from, to) {
        let deltaLat = (to[0] - from[0]) / 100;
        let deltaLng = (to[1] - from[1]) / 100;

        return [from[0] + deltaLat, from[1] + deltaLng];
      },

      move: function(from, to){
        return [this.moveAutoPlus(from[0], to[0]), this.moveAutoMinus(from[1], to[1])]
      },
      move12: function(){
        return [this.moveAutoPlus(this.auto11[0], this.auto12[0]), this.moveAutoMinus(this.auto11[1], this.auto12[1])]
      },
      move13: function(){
        return [this.moveAutoPlus(this.auto11[0], this.auto13[0]), this.moveAutoMinus(this.auto11[1], this.auto13[1])]
      },
      move14: function(){
        return [this.moveAutoPlus(this.auto11[0], this.auto14[0]), this.moveAutoMinus(this.auto11[1], this.auto14[1])]
      },
      move15: function(){
        return [this.moveAutoPlus(this.auto11[0], this.auto15[0]), this.moveAutoMinus(this.auto11[1], this.auto15[1])]
      },
      move22: function(){
        return [this.moveAutoMinus(this.auto21[0], this.auto22[0]), this.moveAutoPlus(this.auto21[1], this.auto22[1])]
      },
      move23: function(){
        return [this.moveAutoMinus(this.auto21[0], this.auto23[0]), this.moveAutoPlus(this.auto21[1], this.auto23[1])]
      },
      move24: function(){
        return [this.moveAutoMinus(this.auto21[0], this.auto24[0]), this.moveAutoPlus(this.auto21[1], this.auto24[1])]
      },
      move25: function(){
        return [this.moveAutoMinus(this.auto21[0], this.auto25[0]), this.moveAutoPlus(this.auto21[1], this.auto25[1])]
      },
      crashFunction: function(auto, num, addr){
        this.info = 'Внимание! Авария! Автомобиль №'+ auto +'. Адрес: '+ addr;
        this.snackbar = true;
        this.$store.commit('addNotification', {
          type: 'АВАРИЯ',
          text: 'Авария! Автомобиль №'+ auto +'.',
          date: '16.01.2019.',
          address: addr,
          color: 'error'
        });

        this.$store.commit('addNotifsTop', 'Автомобиль №1 попал в аварию! Адрес: ' + addr);
      },
      dumpFunction: function(auto){
        this.info = 'Автомобиль №'+ auto +' доставил мусор на свалку.';
        this.snackbar = true;
        this.$store.commit('addNotification', {
          type: 'НА СВАЛКУ',
          text: 'Автомобиль №'+ auto +' доставил мусор на свалку.',
          date: '16.01.2019.',
          address: '',
          color: 'success'
        });
      },
      // autoFunction1: function(auto, num, addr, func){
      autoFunction1: function(auto, num, addr){
        const interval = () => {

          let from = [this.locations[num].latlng.lat, this.locations[num].latlng.lng];
          let to = [this.locations[num + 1].latlng.lat, this.locations[num + 1].latlng.lng]

          let output = "from: " + from + "\nto: " + to;
          // alert(output);

          let deltaLat = (to[0] - from[0]) / 10.0;
          let deltaLng = (to[1] - from[1]) / 10.0;

          // alert(num);

          this.auto11 = [this.auto11[0] + deltaLat, this.auto11[1] + deltaLng];

          let b = this.locations[num + 1].latlng.lat;
          let d = this.locations[num + 1].latlng.lng;

          if(this.auto11[0] >= b && this.auto11[1] <= d){
            clearInterval(intervalId);
            return;
            this.info = 'Автомобиль №'+ auto +' успешно достиг контейнера №'+ num;
            this.snackbar = true;
            this.$store.commit('addNotification', {
              type: 'УСПЕШНОЕ ПРИБЫТИЕ',
              text: 'Автомобиль №'+ auto +' успешно достиг контейнера №'+ num +'.',
              date: '16.01.2019.',
              address: addr,
              color: 'success'
            });

            setTimeout(() => {
              this.info = 'Автомобиль №'+ auto +' успешно разгрузил контейнер №'+ num;
              this.snackbar = true;
              if(num !== 25) {
                this.iconMarkers[num] = this.icons[2];
              }

              num = num % this.locations.length + 1;


              // alert('Inside');

              // this.autoFunction1(auto, this.locations[num + 1].number, 'Addr ' + num);
                // if(num === 29){
                //   this.autoFunction1(1, 27, 'ул. Петропавловская, 70', this.move13);
                // }
                // if(num === 27){
                //   this.autoFunction1(1, 26, 'ул. Окулова, 123', this.move14);
                // }
                // if(num === 26){
                //   this.autoFunction1(1, 25, 'ул. Дзержинского, 43', this.move15);
                // }
                // if(num === 25){
                //   this.crashFunction(1, 25, 'ул. Дзержинского, 43');
                // }
            }, 700);
          }
        }
        let intervalId = setInterval(interval, 700);
      },
      autoFunction2: function(auto, num, addr, func){
        const interval = () => {
          this.auto21 = func();

          let b, d;
          if(num === 24){
            b = this.auto22[0];
            d = this.auto22[1];
          }
          if(num === 23){
            b = this.auto23[0];
            d = this.auto23[1];
          }
          if(num === 22){
            b = this.auto24[0];
            d = this.auto24[1];
          }
          if(num === 21){
            b = this.auto25[0];
            d = this.auto25[1];
          }

          if(this.auto21[0] <= b && this.auto21[1] >= d){
            clearInterval(intervalId);
            this.info = (num === 21) ? 'Автомобиль №'+ auto +' успешно достиг свалки' : 'Автомобиль №'+ auto +' успешно достиг контейнера №'+ num;
            this.snackbar = true;

            this.$store.commit('addNotification', {
              type: 'УСПЕШНОЕ ПРИБЫТИЕ',
              text: (num === 21) ? 'Автомобиль №'+ auto +' достиг свалки' : 'Автомобиль №'+ auto +' успешно достиг контейнера №'+ num +'.',
              date: '16.01.2019.',
              address: addr,
              color: 'success'
            });

            setTimeout(() => {
              this.info = (num === 21) ? 'Автомобиль №'+ auto +' успешно разгрузился на свалке' : 'Автомобиль №'+ auto +' успешно разгрузил контейнер №'+ num;
              this.snackbar = true;
              this.iconMarkers[num] = this.icons[2];

              if(num === 24){
                this.autoFunction2(2, 23, 'ул. Г.Успенского, 15', this.move23);
              }
              if(num === 23){
                this.autoFunction2(2, 22, 'ул. Соловьёва, 14', this.move24);
              }
              if(num === 22){
                this.autoFunction2(2, 21, 'Свалка', this.move25);

                this.info = 'Автомобиль №'+ auto +' направляется на свалку';
                this.snackbar = true;
              }
              if(num === 21){
                //this.dumpFunction(2);
              }
            }, 7000);

          }
        }
        const intervalId = setInterval(interval, 1000);
      },
      autoFunction3: function(){
        const interval = () => {
          this.auto31 = [this.moveAutoMinus(this.auto31[0], this.auto32[0]), this.moveAutoMinus(this.auto31[1], this.auto32[1])]

          if(this.auto31[0] <= this.auto32[0] && this.auto31[1] <= this.auto32[1]){
            clearInterval(intervalId);
            this.info = 'Автомобиль №3 попал в аварию! Адрес: Шоссе Космонавтов, 111.';
            this.snackbar = true;

            this.$store.commit('addNotification', {
              type: 'ВНИМАНИЕ! АВАРИЯ!',
              text: 'Автомобиль №3 попал в аварию!',
              date: '16.01.2019.',
              address: 'Шоссе Космонавтов, 111',
              color: 'error'
            });

            this.$store.commit('addNotifsTop', 'Автомобиль №3 попал в аварию! Адрес: Шоссе Космонавтов, 111');
          }
        }
        const intervalId = setInterval(interval, 1000);
      }

    },
    computed: mapState({
      ...mapState(['notifications']),
    }),
    data () {
      let icon = Vue2Leaflet.L.icon(Object.assign({},
              Vue2Leaflet.L.Icon.Default.prototype.options,
              {iconUrl, shadowUrl}
      ))

      let iconAuto = L.icon({
        iconUrl: iconAutoUrl,
      })

      let icons = [
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.red, shadowUrl, iconSize:     [35, 35]})),
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.blue, shadowUrl, iconSize:     [35, 35]})),
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.green, shadowUrl, iconSize:     [35, 35]})),
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.yellow, shadowUrl, iconSize:     [35, 35]}))
      ]

      let locations = [];
      let iconMarkers = [];
      let markers = store.state.markers;


      markers.forEach(function(marker) {
        let coords = marker.coords;
        locations.push({
          id: marker.number,
          latlng: Vue2Leaflet.L.latLng(coords[0], coords[1]),
          text: 'Контейнер №' + marker.number
        })
        iconMarkers.push(icons[marker.number % 3]);
      })

      return {
        locations,
        icon,
        iconAuto,
        iconMarkers,
        icons,
        clusterOptions: {},
        initialLocation: Vue2Leaflet.L.latLng(58.0043, 56.2396),
        auto11: [locations[0].latlng.lat, locations[0].latlng.lng],
        auto12: [locations[1].latlng.lat, locations[1].latlng.lng],
        auto13: [locations[2].latlng.lat, locations[2].latlng.lng],
        auto14: [locations[3].latlng.lat, locations[3].latlng.lng],
        auto15: [locations[4].latlng.lat, locations[4].latlng.lng],
        // auto21: [locations[5].latlng.lat, locations[5].latlng.lng],
        // auto22: [locations[6].latlng.lat, locations[6].latlng.lng],
        // auto23: [locations[7].latlng.lat, locations[7].latlng.lng],
        // auto24: [locations[8].latlng.lat, locations[8].latlng.lng],
        // auto25: [locations[9].latlng.lat, locations[9].latlng.lng],
        // auto31: [58.00001, 56.20699],
        // auto32: [locations[20].latlng.lat, locations[20].latlng.lng],
        // auto41: [58.00001, 56.24999],
        // auto51: [58.01611, 56.23009],
        snackbar: false,
        info: null
      }
    },

    mounted() {
      const a = this.auto11[0];
      const b = this.auto12[0];
      const c = this.auto11[1];
      const d = this.auto12[1];

      for (let index = 1; index < this.locations.length - 1; index++) {
        this.autoFunction1(1, index + 1, 'Addr ' + (index + 1));
      }

      // this.autoFunction1(1, 1, 'ул. Ленина, 80');
      // this.autoFunction1(1, 29, 'ул. Ленина, 80', this.move12);
      // this.autoFunction2(2, 24, 'ул. Грузинская, 2', this.move22);
      // this.autoFunction3();

      setTimeout(() => {
        this.info = 'Возгорание контейнера №19! Адрес: ул. Кронштадтская, 88.';
        this.snackbar = true;

        this.$store.commit('addNotification', {
          type: 'ВНИМАНИЕ! ВОЗГОРАНИЕ!',
          text: 'Возгорание контейнера №19!',
          date: '16.01.2019.',
          address: 'ул. Кронштадтская, 88',
          color: 'error'
        });

        this.$store.commit('addNotifsTop', 'Возгорание контейнера №19! Адрес: ул. Кронштадтская, 88');
      }, 19000);

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
