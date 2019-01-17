<template>
  <!--
  <div>
    <div class="mapouter">
      <div class="gmap_canvas">
      <div id="app">
        <div id="mymap"></div>
      </div>
    </div>
    </div>
  </div>
  -->
  <div class="mapouter">
    <div class="gmap_canvas">
      <div id="app">
        <v-map :zoom=12 :center="initialLocation">
          <v-icondefault></v-icondefault>
          <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
          <v-marker-cluster :options="clusterOptions" @clusterclick="click()">
            <v-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng" :icon="icons[l.id % 4]">
              <v-popup :content="l.text"></v-popup>
            </v-marker>
          </v-marker-cluster>
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
</style>

<!--
<script>
  import L from 'leaflet';
  import { mapState } from 'vuex';

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize:     [28, 30], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [3, -90]
    }
  });

  const greenIcon = new LeafIcon({ iconUrl: 'http://localhost:8080/img/iGreen.png' }),
        redIcon = new LeafIcon({ iconUrl: 'http://localhost:8080/img/iRed.png' }),
        blackIcon = new LeafIcon({ iconUrl: 'http://localhost:8080/img/iBlack.png' }),
        blueIcon = new LeafIcon({ iconUrl: 'http://localhost:8080/img/iBlue.png' });

  const customOptions =
    {
      'maxWidth': '500',
      'className' : 'custom'
    }

  const icons = {
    'green': greenIcon,
    'red': redIcon,
    'blue': blueIcon,
    'black': blackIcon,

  };

  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const mymap = L.map('mymap').setView([58.0043, 56.2396], 16);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
//icon: icons[item.icon],
        this.markers.forEach( (item, i) => {
          L.marker(item.coords, {title: item.title}).addTo(mymap)
            .bindPopup('<p><b>'+ item.title +'</b><p></p>Заполненность: '+ item.percent +'%</p><p><img src="http://localhost:8080/img/places/'+ item.img +'" /></p>', customOptions);
        } )

      }
    },
    computed: mapState({
      ...mapState(['markers']),

    })
  }
</script>
-->
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
  import * as Vue2Leaflet from 'vue2-leaflet';
  import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster';
  import iconUrl from 'leaflet/dist/images/marker-icon.png';
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

  const iconMarkersUrl = {
    red: 'http://localhost:8080/img/marker-icon-red.png',
    green: 'http://localhost:8080/img/marker-icon-green.png',
    blue: 'http://localhost:8080/img/marker-icon-blue.png',
    yellow: 'http://localhost:8080/img/marker-icon-yellow.png'
  }

  function rand(n) {
    let max = n + 0.1
    let min = n - 0.1
    let result = Math.random() * (max - min) + min
    return result
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
      }
    },
    data () {
      let locations = []
      for (let i = 0; i < 30; i++) {
        let coords = rand2(58.0043, 56.2396);
        //console.log(coords);
        locations.push({
          id: i,
          latlng: Vue2Leaflet.L.latLng(coords[0], coords[1]),
          //latlng: Vue2Leaflet.L.latLng(rand(58.0043), rand(56.2396)),
          text: 'Контейнер №' + i
        })
      }

      let icons = [
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.red, shadowUrl, iconSize:     [35, 35]})),
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.blue, shadowUrl, iconSize:     [35, 35]})),
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.green, shadowUrl, iconSize:     [35, 35]})),
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.yellow, shadowUrl, iconSize:     [35, 35]}))
      ]

      return {
        locations,
        icons,
        clusterOptions: {},
        initialLocation: Vue2Leaflet.L.latLng(58.0043, 56.2396)
      }
    },
    mounted() {
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
