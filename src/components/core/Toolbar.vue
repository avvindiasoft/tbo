<template>
  <v-toolbar
    id="core-toolbar"
    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ titleName }}

      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <!--
        <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="Search..."
          hide-details
          color="purple"
        />
        -->

        <!--
        <router-link
          v-ripple
          class="toolbar-items"
          to="/"
        >
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>
        -->

        <v-menu bottom left>
          <v-btn
            slot="activator"
            dark
            icon
          >
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge">
                {{ this.$store.state.notifsTop.length }}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, i) in this.$store.state.notifsTop"
              :key="i"
              @click=""
            >
              <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

<!--
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
          <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            to="/notifications"
          >
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge">
                {{ this.$store.state.notifsTop.length }}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </router-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in this.$store.state.notifsTop"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title
                  v-text="notification"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
        -->
        <!--
        <router-link
          v-ripple
          class="toolbar-items"
          to="/user-profile"
        >
          <v-icon color="tertiary">mdi-account</v-icon>
        </router-link>
        -->
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import {
  mapMutations
} from 'vuex';

export default {
  data: () => ({
    notifications: [
      'Повреждён датчик контейнера №3 (сквер у строения "Дом чекистов")'
    ],
    title: null,
    responsive: false,
    responsiveInput: false,
    titleName: '',
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  }),

  watch: {
    '$route' (val){
      this.title = val.name
      switch(val.name){
        case 'Dashboard':
          this.titleName = 'Сводная статистика';
          break;

        case 'Notifications':
          this.titleName = 'Список актуальных уведомлений';
          break;

        case 'Maps':
          this.titleName = 'Карта расположения контейнеров';
          break;

        case 'Auto':
          this.titleName = 'Движение автомобилей';
          break;

        default:
          this.titleName = '';
      }
    }
  },

  mounted () {
    //console.log(this.$store.state.notifsTop);
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick (){
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
