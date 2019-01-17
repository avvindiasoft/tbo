<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
        sm12
        lg4
      >
        <material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="info"
          type="Line"
        >
          <h4 class="title font-weight-light">Средняя загруженность</h4>
          <p class="category d-inline-flex font-weight-light">
            Количество мусора в контейнерах снижено на
            <v-icon
              color="green"
              small
            >
              mdi-arrow-down
            </v-icon>
            <span class="green--text">20%</span>&nbsp;
          </p>

          <template slot="actions">
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">обновлено 4 минуты назад</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex
        md12
        sm12
        lg4
      >
        <material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="red"
          type="Bar"
        >
          <h4 class="title font-weight-light">Текущая загруженность контейнеров</h4>
          <v-icon
            class="mr-1"
            color="red"
            small
          >
            mdi-alert
          </v-icon>
          <p class="category d-inline-flex font-weight-light">Наиболее загруженные контейнеры</p>
          <template slot="actions">
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">обновлено 10 минут назад</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex
        md12
        sm12
        lg4
      >
        <material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          color="green"
          type="Line"
        >
          <h3 class="title font-weight-light">Автомобили</h3>
          <p class="category d-inline-flex font-weight-light">Количество автомобилей на линии</p>

          <template slot="actions">
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">обновлено 13 минут назад</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex
        sm12
        xs12
        md12
        lg12
      >
        <material-stats-card
          :value="dataAveragePercent + '%'"
          color="green"
          icon="mdi-store"
          title="Текущая средняя загруженность"
          sub-icon="mdi-calendar"
          sub-text="За последние 24 часа"
        />
      </v-flex>
      <v-flex
        md12
        lg6
      >
        <material-card
          color="orange"
          title="Состояние контейнеров"
          text="Состояние контейнеров на 16 января 2019"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.title }}</td>
              <td class="text-xs-right">{{ item.percent }}%</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        md12
        lg6
      >
        <material-card
          color="orange"
          title="Автомобили"
          text="Текущая статистика автомобилей"
        >
          <v-data-table
            :headers="headersCars"
            :items="cars"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.isOnRoute ? 'На маршруте' : 'В ожидании' }}</td>
              <td class="text-xs-right">{{ item.percent }}%</td>
              <td class="text-xs-right">{{ (item.isDefected) ? 'Поврежден' : 'Целый' }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        md12
        lg6
      >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import store from '@/store'

  export default {

    data: function () {
      let markers = store.state.markers
      let containers = markers.slice().sort((a, b) => (a.percent > b.percent ? -1 : 1))
      let cars = store.state.cars
      let history = store.state.history
      let avg = (markers.map(data => data['percent'])
        .reduce((prev, curr) => prev + curr, 0) / markers.length)
        .toFixed(2)
      let size = 10
      /*
      cars = cars.map((car) => {
        car.isDefected = (car.isDefected || car.isDefected === 'Целый') ? 'Поврежден' : 'Целый'
        car.isOnRoute = car.isOnRoute ? 'На маршруте' : 'В ожидании'
        return car
      })
      console.log(cars)
      */

      return {
        dailySalesChart: {
          data: {
            labels: history.map((el) => (el.date)),
            series: [
              history.map((el) => (el.percent))
            ]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 5
            }
          }
        },
        dataCompletedTasksChart: {
          data: {
            labels: history.map((el) => (el.date)),
            series: [
              history.map((el) => (el.carsCount))
            ]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 20, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 5
            }
          }
        },
        emailsSubscriptionChart: {
          data: {
            labels: containers.slice(0, size).map(data => "№" + data['number']),
            series: [
              containers.slice(0, size).map(data => data['percent'])
            ]
          },
          options: {
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 100,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 5
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        dataAveragePercent: avg,
        headers: [
          {
            sortable: true,
            text: 'ID',
            value: 'id'
          },
          {
            sortable: false,
            text: 'Наименование',
            value: 'title'
          },
          {
            sortable: false,
            text: 'Загруженность',
            value: 'percent',
            align: 'right'
          }
        ],
        headersCars: [
          {
            sortable: true,
            text: 'ID',
            value: 'id'
          },
          {
            sortable: true,
            text: 'Статус',
            value: 'status'
          },
          {
            sortable: true,
            text: 'Загруженность',
            value: 'percent',
            align: 'right'
          },
          {
            sortable: false,
            text: 'Состояние',
            value: 'isDefected',
            align: 'center'
          }
        ],
        items: markers,
        cars: cars,
        tabs: 0,
        list: {
          0: false,
          1: false,
          2: false
        }
      }
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      }
    }
  }
</script>
