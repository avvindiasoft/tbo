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
      <div id="app">

        <v-map :zoom=15 :center="initialLocation" ref="map">
          <v-icondefault></v-icondefault>
          <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
          <v-marker-cluster :options="clusterOptions" @clusterclick="click()">
            <v-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng" :icon="iconMarkers[l.id]">
              <v-popup :content="l.text"></v-popup>
            </v-marker>
          </v-marker-cluster>
          <v-marker :lat-lng="auto1" :icon="iconAuto"></v-marker>
          <v-marker :lat-lng="auto2" :icon="iconAuto"></v-marker>



          <!--
 <v-marker :lat-lng="[58.0030, 56.2075]" :icon="iconMarkers[4]"></v-marker>

          -->

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
  import store from '@/store';
  import { mapState } from 'vuex';
  //import LMovingMarker from 'vue2-leaflet-movingmarker';


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
      getCoords: function(num){
        return [this.locations[num].latlng.lat, this.locations[num].latlng.lng];
      },
      getRoutes: function(auto, num){
        const routes = {
          auto1: [
            [58.0032, 56.2068],
            [58.00350, 56.2092], [58.0086, 56.2369],  [58.0095, 56.2402], [58.0072, 56.2432],  [58.0008, 56.2493],
            [58.0004, 56.2492],  [57.9994, 56.2464],  [57.9993, 56.2458], [57.9950, 56.2496],  [57.9953, 56.2515],
            [57.9942, 56.2472],  [58.00122, 56.2393], [58.0039, 56.2378], [58.00355, 56.2363], [58.0032, 56.2329],
            [58.0033, 56.2320],  [58.0039, 56.2317],  [58.0042, 56.2310], [58.0017, 56.21615], [58.0019, 56.21605],
            [58.00305, 56.2150], [58.0023, 56.2114],  [58.0032, 56.2068]
          ],
          auto2: [
            [58.0080, 56.2740],
            [58.00697, 56.2704],  [58.0069, 56.2690],    [58.00923, 56.26650], [58.0096, 56.26545],  [58.00959, 56.26486],
            [58.00975, 56.26448], [58.009798, 56.26345], [58.00988, 56.26255], [58.00977, 56.26184], [58.00089, 56.2705],
            [57.9999, 56.2712],   [57.9977, 56.2624],    [58.0038, 56.2554],   [58.0048, 56.2546],   [58.0056, 56.2572],
            [58.0070, 56.2560],   [58.0095, 56.2538],    [58.0111, 56.2594],   [58.0080, 56.2632],   [58.00865, 56.26705],
            [58.0070, 56.2689],   [58.0080, 56.2740],
          ]
        };
        return { from: routes[auto][num-1], to: routes[auto][num] }
      },
      setGreen: function(num){
        this.iconMarkers[num] = this.icons[0];
      },
      setBlue: function(num){
        this.iconMarkers[num] = this.icons[2];
      },
      moveAutoPlus: function(a, b, delta){
        return (a <= b) ? a + delta : a;
      },
      moveAutoMinus: function(a, b, delta){
        return (a >= b) ? a - delta : a;
      },
      moveTopRight: function(auto, num, k, func){
        const routes = this.getRoutes(auto, num);
        const interval = () => {
          const deltaY = (routes.to[0] - routes.from[0]) / (10.0 * k);
          const deltaX = (routes.to[1] - routes.from[1]) / (10.0 * k);
          this[auto] = [this.moveAutoPlus(this[auto][0], routes.to[0], deltaY), this.moveAutoPlus(this[auto][1], routes.to[1], deltaX)];

          if(this[auto][0] >= routes.to[0] && this[auto][1] >= routes.to[1]){
            func();
            clearInterval(intervalId);
          }
        }
        const intervalId = setInterval(interval, 1000);
      },
      moveTopLeft: function(auto, num, k, func){
        const routes = this.getRoutes(auto, num);
        const interval = () => {
          const deltaY = (routes.to[0] - routes.from[0]) / (10.0 * k);
          const deltaX = (routes.from[1] - routes.to[1]) / (10.0 * k);
          this[auto] = [this.moveAutoPlus(this[auto][0], routes.to[0], deltaY), this.moveAutoMinus(this[auto][1], routes.to[1], deltaX)];

          if(this[auto][0] >= routes.to[0] && this[auto][1] <= routes.to[1]){
            func();
            clearInterval(intervalId);
          }
        }
        const intervalId = setInterval(interval, 1000);
      },
      moveBottomLeft: function(auto, num, k, func){
        const routes = this.getRoutes(auto, num);
        const interval = () => {
          const deltaY = (routes.from[0] - routes.to[0]) / (10.0 * k);
          const deltaX = (routes.from[1] - routes.to[1]) / (10.0 * k);
          this[auto] = [this.moveAutoMinus(this[auto][0], routes.to[0], deltaY), this.moveAutoMinus(this[auto][1], routes.to[1], deltaX)];

          if(this[auto][0] <= routes.to[0] && this[auto][1] <= routes.to[1]){
            func();
            clearInterval(intervalId);
          }
        }
        const intervalId = setInterval(interval, 1000);
      },
      moveBottomRight: function(auto, num, k, func){
        const routes = this.getRoutes(auto, num);
        const interval = () => {
          const deltaY = (routes.from[0] - routes.to[0]) / (10.0 * k);
          const deltaX = (routes.to[1] - routes.from[1]) / (10.0 * k);
          this[auto] = [this.moveAutoMinus(this[auto][0], routes.to[0], deltaY), this.moveAutoPlus(this[auto][1], routes.to[1], deltaX)];

          if(this[auto][0] <= routes.to[0] && this[auto][1] >= routes.to[1]){
            func();
            clearInterval(intervalId);
          }
        }
        const intervalId = setInterval(interval, 1000);
      },

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
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.green, shadowUrl, iconSize:     [35, 35]})),
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.yellow, shadowUrl, iconSize:     [35, 35]})),
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.blue, shadowUrl, iconSize:     [35, 35]})),
        L.icon(Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {iconUrl: iconMarkersUrl.red, shadowUrl, iconSize:     [35, 35]}))
      ]

      let locations = [];
      let iconMarkers = [];
      //[58.0032, 56.2738],

      store.state.markers.forEach( (item, i) => {
        locations.push({
          id: i,
          latlng: Vue2Leaflet.L.latLng(item[0], item[1]),
          text: 'Контейнер №' + i
        })
        let r = Math.floor(Math.random() * 2);
        iconMarkers.push(icons[r]);
      } );

      const blueContainers = [8, 9, 20, 30, 47, 49, 50, 107];
      blueContainers.forEach( item => {
        iconMarkers[item] = icons[2];
      } );

      //auto2: [58.0080, 56.2740],
      return {
        locations,
        icon,
        iconAuto,
        iconMarkers,
        icons,
        auto1: [58.0032, 56.2068],
        auto2: [58.0080, 56.2740],
        clusterOptions: {},
        initialLocation: Vue2Leaflet.L.latLng(57.9999, 56.2396),
        snackbar: false,
        info: null
      }
    },

    mounted(){
      const auto1move = () =>
      {
        //1
        this.moveTopRight('auto1', 1, 1, () => { setTimeout(() => {
          this.setGreen(8);
          this.setBlue(54);
          //2
          this.moveTopRight('auto1', 2, 3, () => { setTimeout(() => {
            this.setGreen(9);
            //3
            this.moveTopRight('auto1', 3, 1, () => {
              this.setBlue(48);
              //4
              this.moveBottomRight('auto1', 4, 1, () => { setTimeout(() => {
                this.setGreen(20);
                //5
                this.moveBottomRight('auto1', 5, 1, () => { setTimeout(() => {
                  this.setGreen(30);
                  //6
                  this.moveBottomRight('auto1', 6, 1, () => {
                    this.setBlue(13);
                    //7
                    this.moveBottomLeft('auto1', 7, 1, () => { setTimeout(() => {
                      this.setGreen(47);
                      this.setBlue(18);
                      //8
                      this.moveBottomLeft('auto1', 8, 1, () => {
                        this.setBlue(43);
                        //9
                        this.moveBottomRight('auto1', 9, 1, () => {
                          this.setBlue(42);
                          //10
                          this.moveTopRight('auto1', 10, 1, () => { setTimeout(() => {
                            this.setGreen(48);
                            //11
                            this.moveBottomLeft('auto1', 11, 1, () => { setTimeout(() => {
                              this.setGreen(43);
                              //12
                              this.moveTopLeft('auto1', 12, 1, () => { setTimeout(() => {
                                this.setGreen(42);
                                //13
                                this.moveTopLeft('auto1', 13, 1, () => {
                                  this.setBlue(20);
                                  //14
                                  this.moveTopLeft('auto1', 14, 1, () => { setTimeout(() => {
                                    this.setGreen(18);
                                    //15
                                    this.moveBottomLeft('auto1', 15, 1, () => { setTimeout(() => {
                                      this.setGreen(54);
                                      //16
                                      this.moveTopLeft('auto1', 16, 1, () => {
                                        this.setBlue(9);
                                        //17
                                        this.moveTopLeft('auto1', 17, 1, () => {
                                          this.setBlue(30);
                                          //18
                                          this.moveTopLeft('auto1', 18, 1, () => {
                                            this.setBlue(8);
                                            //19
                                            this.moveBottomLeft('auto1', 19, 2, () => {
                                              this.setBlue(47);
                                              //20
                                              this.moveTopLeft('auto1', 20, 1, () => { setTimeout(() => {
                                                this.setGreen(13);
                                                //21
                                                this.moveTopLeft('auto1', 21, 1, () => {
                                                  this.setBlue(18);
                                                  //22
                                                  this.moveBottomLeft('auto1', 22, 1, () => {
                                                    //23
                                                    this.moveTopLeft('auto1', 23, 1, () => {
                                                      auto1move();
                                                    })
                                                  })
                                                })
                                              }, 7000) })
                                            })
                                          })
                                        })
                                      })
                                    }, 7000) }) }, 7000) })
                                })
                              }, 7000) })
                            }, 7000)
                            })
                          }, 7000) });
                        });
                      });
                    }, 7000) });
                  });
                }, 7000)
                });
              }, 7000)
              });
            });
          }, 7000)
          });
        }, 7000);
        });
      }

      //setTimeout(() => {}, 1000)

      const auto2move = () => {
        //1
        this.moveBottomLeft('auto2', 1, 1, () => { setTimeout(() => {
          this.setGreen(107);
          //2
          this.moveBottomLeft('auto2', 2, 1, () => {
            //3
            this.moveTopLeft('auto2', 3, 1, () => {
              //4
              this.moveTopLeft('auto2', 4, 1, () => { setTimeout(() => {
                this.setGreen(49);
                //5
                this.moveTopLeft('auto2', 5, 1, () => {
                  //6
                  this.moveTopLeft('auto2', 6, 1, () => {
                    //7
                    this.moveTopLeft('auto2', 7, 1, () => {
                      //8
                      this.moveTopLeft('auto2', 8, 1, () => {
                        //9
                        this.moveTopLeft('auto2', 9, 1, () => {
                          //10
                          this.moveBottomRight('auto2', 10, 2, () => { setTimeout(() => {
                            this.setGreen(50);
                            //11
                            this.moveBottomRight('auto2', 11, 1, () => {
                              this.setBlue(29);
                              //12
                              this.moveBottomLeft('auto2', 12, 1, () => {
                                this.setBlue(26);
                                //13
                                this.moveTopLeft('auto2', 13, 1, () => { setTimeout(() => {
                                  this.setGreen(29);
                                  //14
                                  this.moveTopLeft('auto2', 14, 1, () => {
                                    this.setBlue(106);
                                    //15
                                    this.moveTopRight('auto2', 15, 1, () => {
                                      //16
                                      this.moveTopLeft('auto2', 16, 1, () => { setTimeout(() => {
                                        this.setGreen(26);
                                        //17
                                        this.moveTopLeft('auto2', 17, 1, () => {
                                          //18
                                          this.moveTopRight('auto2', 18, 1, () => {
                                            //19
                                            this.moveBottomRight('auto2', 19, 1, () => {
                                              //20
                                              this.moveTopRight('auto2', 20, 1, () => {
                                                //21
                                                this.moveBottomRight('auto2', 21, 1, () => {
                                                  //22
                                                  this.moveTopRight('auto2', 22, 1, () => { setTimeout(() => {
                                                    this.setGreen(106);
                                                    this.setBlue(107);
                                                    this.setBlue(49);
                                                    this.setBlue(50);
                                                    auto2move();
                                                  }, 7000) })
                                                })
                                              })
                                            })
                                          })
                                        })
                                      }, 7000) })
                                    })
                                  })
                                }, 7000) })
                              })
                            })
                          }, 7000) })
                        })
                      })
                    })
                  })
                })
              }, 7000) });
            });
          }) }, 7000);
        })
      }

      auto1move();
      auto2move();


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