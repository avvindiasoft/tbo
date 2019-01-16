<template>
  <v-container
    fluid
    grid-list-xl
    fill-height>
    <v-layout
      justify-center
      align-center
    >
      <v-flex xs12>
        <material-card
          color="green">
          <div
            slot="header"
          >
            <div class="title font-weight-light mb-2">Уведомления</div>
            <div class="category">
              Список всех предупреждений и уведомлений.
              <!--
              <v-icon
                size="17"
              >
                mdi-heart
              </v-icon>
              -->
            </div>
          </div>

          <v-card-text>
            <v-layout
              row
              wrap>
              <!--
              <v-flex
                md6
                sm12>
                <h2 class="title font-weight-light mb-3">Notifications Style</h2>

                <material-notification
                  class="mb-3"
                  color="info"
                >
                  This is a plain notification
                </material-notification>
                <material-notification
                  class="mb-3"
                  color="info"
                  dismissible
                >
                  This is a notification with close button.
                </material-notification>
                <material-notification
                  class="mb-3"
                  color="info"
                  dismissible
                  icon="mdi-bell-plus"
                >

                  This is a notification with close button and icon.
                </material-notification>
                <material-notification
                  class="mb-3"
                  color="info"
                  dismissible
                  icon="mdi-bell-plus"
                >

                  This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style.
                </material-notification>
              </v-flex>
              -->

              <v-flex
                md12
                sm12>
                <!--<h2 class="title font-weight-light">Notifcation States</h2>-->

                <!--
                <material-notification
                  class="mb-3"
                  color="warning"
                  dismissible
                >
                  <strong>ПРЕДУПРЕЖДЕНИЕ О ПОВРЕЖДЕНИИ АВТОМОБИЛЯ: </strong> Автомобиль №1 повреждён и ожидает. <br />
                  <span>Дата: 11.01.2019. | Адрес: ул. Революции, 50</span>
                </material-notification>

                <material-notification
                  class="mb-3"
                  color="info"
                  dismissible
                >
                  <strong>ЕЖЕДНЕВНОЕ ОПОВЕЩЕНИЕ: </strong> Все автомобили вышли на маршрут и работают в штатном режиме. <br />
                  <span>Дата: 10.01.2019.</span>
                </material-notification>

                <material-notification
                  class="mb-3"
                  color="success"
                  dismissible
                >
                  <strong>СООБЩЕНИЕ ОБ УСПЕШНОМ ПРОХОЖДЕНИИ МАРШРУТА: </strong> Автомобиль №2 успешно прошёл маршрут и ожидает. <br />
                  <span>Дата: 10.01.2019. | Адрес: ул. Революции, 50</span>
                </material-notification>

                <material-notification
                  class="mb-3"
                  color="error"
                  dismissible
                >
                  <strong>ЗАПОЛНЕННЫЙ КОНТЕЙНЕР: </strong> Процент заполненности контейнера №5 составляет 95%. <br />
                  <span>Дата: 09.01.2019. | Адрес: ул. Революции, 52</span>
                </material-notification>
                -->


                <material-notification v-for="n in notifications"
                  class="mb-3"
                  :color="n.color"
                  dismissible
                >
                  <strong>{{n.type}}: </strong> {{n.text}} <br />
                  <span>Дата: {{n.date}} | Адрес: {{n.address}}</span>
                </material-notification>

                <!--
                <material-notification
                  class="mb-3"
                  color="error"
                  dismissible
                >
                  <strong>ЗАПОЛНЕННЫЙ КОНТЕЙНЕР: </strong> Процент заполненности контейнера №29 составляет 90%. <br />
                  <span>Дата: 09.01.2019. | Адрес: ул. Монастырская, 14</span>
                </material-notification>

                <material-notification
                  class="mb-3"
                  color="black"
                  dismissible
                >
                  <strong>ПОВРЕЖДЕНИЕ ДАТЧИКА:</strong> Повреждён датчик контейнера №3 (сквер у строения "Дом чекистов"). <br />
                  <span>Дата: 08.01.2019. | Адрес: ул. Сибирская, 32</span>
                </material-notification>
                -->

              </v-flex>
            </v-layout>

            <!--
            <div class="text-xs-center">
              <h2 class="title font-weight-light mb-2">Notification Places</h2>
              <span class=" subheading font-weight-light grey--text">Click to view notifications</span>
            </div>

            <v-container grid-list-lg>
              <v-layout
                justify-center
                row
                wrap>
                <v-flex
                  xs12
                  sm4>
                  <v-btn
                    block
                    color="success"
                    @click="snack('top', 'left')"
                  >
                    Top Left
                  </v-btn>
                </v-flex>
                <v-flex
                  xs12
                  sm4>
                  <v-btn
                    block
                    color="success"
                    @click="snack('top')"
                  >
                    Top Center
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout
                justify-center
                row
                wrap>
                <v-flex
                  xs12
                  sm4>
                  <v-btn
                    block
                    color="success"
                    @click="snack('top', 'right')"
                  >
                    Top Right
                  </v-btn>
                </v-flex>
                <v-flex
                  xs12
                  sm4>
                  <v-btn
                    block
                    color="success"
                    @click="snack('bottom', 'left')"
                  >
                    Bottom Left
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout
                justify-center
                row
                wrap>
                <v-flex
                  xs12
                  sm4>
                  <v-btn
                    block
                    color="success"
                    @click="snack('bottom')"
                  >
                    Bottom Center
                  </v-btn>
                </v-flex>
                <v-flex
                  xs12
                  sm4>
                  <v-btn
                    block
                    color="success"
                    @click="snack('bottom', 'right')"
                  >
                    Bottom Right
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>

            <v-snackbar
              :color="color"
              :bottom="bottom"
              :top="top"
              :left="left"
              :right="right"
              v-model="snackbar"
              dark
            >
              <v-icon
                color="white"
                class="mr-3"
              >
                mdi-bell-plus
              </v-icon>
              <div>Welcome to <b>Vue Material Dashboard</b> - a beautiful freebie for every web developer.</div>
              <v-icon
                size="16"
                @click="snackbar = false"
              >
                mdi-close-circle
              </v-icon>
            </v-snackbar>
            -->

          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data: () => ({
      color: null,
      colors: [
        'purple',
        'info',
        'success',
        'warning',
        'error'
      ],
      top: true,
      bottom: false,
      left: false,
      right: false,
      snackbar: false
    }),

    methods: {
      snack (...args) {
        this.top = false
        this.bottom = false
        this.left = false
        this.right = false

        for (const loc of args) {
          this[loc] = true
        }

        this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

        this.snackbar = true
      }
    },
    computed: mapState({
      ...mapState(['notifications']),
    }),
  }
</script>
