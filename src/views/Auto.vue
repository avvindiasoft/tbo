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
          <v-marker :key="auto1" :lat-lng="auto21" :icon="iconAuto">
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

  import { mapState } from 'vuex';

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
          date: '09.01.2019.',
          address: addr,
          color: 'error'
        });
      },
      dumpFunction: function(auto){
        this.info = 'Автомобиль №'+ auto +' везёт мусор на свалку.';
        this.snackbar = true;
        this.$store.commit('addNotification', {
          type: 'НА СВАЛКУ',
          text: 'Автомобиль №'+ auto +' доставил мусор на свалку.',
          date: '09.01.2019.',
          address: '',
          color: 'success'
        });
      },
      autoFunction1: function(auto, num, addr, func){
        const interval = () => {
          this.auto11 = func();

          let b, d;
          if(num === 29){
            b = this.auto12[0];
            d = this.auto12[1];
          }
          if(num === 27){
            b = this.auto13[0];
            d = this.auto13[1];
          }
          if(num === 26){
            b = this.auto14[0];
            d = this.auto14[1];
          }
          if(num === 25){
            b = this.auto15[0];
            d = this.auto15[1];
          }

          if(this.auto11[0] >= b && this.auto11[1] <= d){
            clearInterval(intervalId);
            this.info = 'Автомобиль №'+ auto +' успешно достиг контейнера №'+ num;
            this.snackbar = true;
            this.$store.commit('addNotification', {
              type: 'УСПЕШНОЕ ПРИБЫТИЕ',
              text: 'Автомобиль №'+ auto +' успешно достиг контейнера №'+ num +'.',
              date: '09.01.2019.',
              address: addr,
              color: 'success'
            });

            setTimeout(() => {
              this.info = 'Автомобиль №'+ auto +' успешно разгрузил контейнер №'+ num;
              this.snackbar = true;
              if(num === 29){
                this.autoFunction1(1, 27, 'ул. Петропавловская, 70', this.move13);
              }
              if(num === 27){
                this.autoFunction1(1, 26, 'ул. Окулова, 123', this.move14);
              }
              if(num === 26){
                this.autoFunction1(1, 25, 'ул. Джержинского, 43', this.move15);
              }
              if(num === 25){
                this.crashFunction(1, 25, 'ул. Джержинского, 43');
              }
            }, 7000);

          }
        }
        const intervalId = setInterval(interval, 1000);
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
            this.info = 'Автомобиль №'+ auto +' успешно достиг контейнера №'+ num;
            this.snackbar = true;
            this.$store.commit('addNotification', {
              type: 'УСПЕШНОЕ ПРИБЫТИЕ',
              text: 'Автомобиль №'+ auto +' успешно достиг контейнера №'+ num +'.',
              date: '09.01.2019.',
              address: addr,
              color: 'success'
            });

            setTimeout(() => {
              this.info = 'Автомобиль №'+ auto +' успешно разгрузил контейнер №'+ num;
              this.snackbar = true;

              if(num === 24){
                this.autoFunction2(2, 23, 'ул. Г.Успенского, 15', this.move23);
              }
              if(num === 23){
                this.autoFunction2(2, 22, 'ул. Соловьёва, 14', this.move24);
              }
              if(num === 22){
                this.autoFunction2(2, 21, 'Свалка', this.move25);
              }
              if(num === 21){
                this.dumpFunction(2);
              }
            }, 7000);

          }
        }
        const intervalId = setInterval(interval, 1000);
      }

    },
    computed: mapState({
      ...mapState(['notifications']),
    }),
    data () {
      let locations = [];
      let alret = true;
      for (let i = 0; i < 21; i++) {
        locations.push({
          id: i,
          latlng: Vue2Leaflet.L.latLng(rand(58.0043), rand(56.2396)),
          text: 'Контейнер №' + i
        })
      }
//27: [58.00997, 56.20199],
      //test
      /*



      **/
      const obj = {
        21: [57.88987, 56.33919],
        22: [57.99087, 56.24919],
        23: [57.99887, 56.24099],
        24: [58.00087, 56.20999],
        25: [58.00799, 56.16901],
        26: [58.00697, 56.19401],
        27: [58.00687, 56.20499],
        28: [58.00439, 56.23969],
        29: [58.00687, 56.21499],
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
        auto13: [locations[27].latlng.lat, locations[27].latlng.lng],
        auto14: [locations[26].latlng.lat, locations[26].latlng.lng],
        auto15: [locations[25].latlng.lat, locations[25].latlng.lng],
        auto21: [locations[27].latlng.lat, locations[27].latlng.lng],
        auto22: [locations[24].latlng.lat, locations[24].latlng.lng],
        auto23: [locations[23].latlng.lat, locations[23].latlng.lng],
        auto24: [locations[22].latlng.lat, locations[22].latlng.lng],
        auto25: [locations[21].latlng.lat, locations[21].latlng.lng],
        snackbar: false,
        info: null
      }
    },

    mounted() {
      const a = this.auto11[0];
      const b = this.auto12[0];
      const c = this.auto11[1];
      const d = this.auto12[1];

      this.autoFunction1(1, 29, 'ул. Ленина, 80', this.move12);
      this.autoFunction2(2, 24, 'ул. Грузинская, 2', this.move22);

      /*
      const interval = () => {
        this.auto11 = [this.moveAutoPlus(this.auto11[0], this.auto12[0]), this.moveAutoMinus(this.auto11[1], this.auto12[1])];

        if(this.auto11[0] >= b && this.auto11[1] <= d){
          clearInterval(intervalId);
          this.info = 'Автомобиль №1 добрался до контейнера №29';
          this.snackbar = true;
          this.$store.commit('addNotification', {
            type: 'УСПЕШНОЕ ПРИБЫТИЕ',
            text: 'Автомобиль №1 добрался до контейнера №29.',
            date: '09.01.2019.',
            address: 'ул. Монастырская, 14',
            color: 'success'
          });
        }
      }
      const intervalId = setInterval(interval,1000);
      */

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