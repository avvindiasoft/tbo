// https://vuex.vuejs.org/en/state.html
// https://vuex.vuejs.org/en/state.html

export default {
  markers: [
    {
      coords: [58.00218, 56.23720],
      icon: 'red',
      title: 'Контейнер №1',
      percent: 30,
      img: '01.jpg'
    },
    {
      coords: [58.00623, 56.23378],
      icon: 'green',
      title: 'Контейнер №2',
      percent: 15,
      img: '02.jpg'
    },
    {
      coords: [58.00613, 56.25389],
      icon: 'black',
      title: 'Контейнер №3',
      percent: 0,
      img: '03.jpg'
    },
    {
      coords: [58.00623, 56.24378],
      icon: 'green',
      title: 'Контейнер №4',
      percent: 25,
      img: '04.jpg'
    },
    {
      coords: [58.00200, 56.24348],
      icon: 'red',
      title: 'Контейнер №5',
      percent: 95,
      img: '05.jpg'
    },
    {
      coords: [58.00723, 56.23898],
      icon: 'blue',
      title: 'Контейнер №6',
      percent: 50,
      img: '06.jpg'
    },
    {
      coords: [58.00203, 56.23000],
      icon: 'green',
      title: 'Контейнер №7',
      percent: 10,
      img: '07.jpg'
    },
    {
      coords: [58.00503, 56.24000],
      icon: 'green',
      title: 'Контейнер №8',
      percent: 10,
      img: '07.jpg'
    },
    {
      coords: [58.00203, 56.23000],
      icon: 'green',
      title: 'Контейнер №9',
      percent: 10,
      img: '07.jpg'
    },
    {
      coords: [58.00203, 56.23000],
      icon: 'green',
      title: 'Контейнер №10',
      percent: 10,
      img: '07.jpg'
    },
    {
      coords: [58.00203, 56.23000],
      icon: 'green',
      title: 'Контейнер №11',
      percent: 10,
      img: '07.jpg'
    }
  ],
  cars: [
    {
      id: 1,
      coords: [58.10219, 56.23124],
      isOnRoute: true,
      percent: 10,
      isDefected: false
    },
    {
      id: 2,
      coords: [58.00219, 56.20124],
      isOnRoute: true,
      percent: 90,
      isDefected: false
    },
    {
      id: 3,
      coords: [58.00219, 57.23124],
      isOnRoute: true,
      percent: 35,
      isDefected: true
    },
    {
      id: 4,
      coords: [59.00219, 56.23124],
      isOnRoute: false,
      percent: 75,
      isDefected: true
    },
    {
      id: 5,
      coords: [58.05219, 56.53124],
      isOnRoute: false,
      percent: 100,
      isDefected: false
    }
  ],
  history: [
    {
      date: '12:00',
      percent: 75
    },
    {
      date: '13:00',
      percent: 70
    },
    {
      date: '14:00',
      percent: 63
    },
    {
      date: '15:00',
      percent: 51
    },
    {
      date: '16:00',
      percent: 66
    },
    {
      date: '17:00',
      percent: 68
    },
    {
      date: '18:00',
      percent: 61
    }
  ]
}



/*
export default {
  notifications: [
    {
      type: 'ЗАПОЛНЕННЫЙ КОНТЕЙНЕР',
      text: 'Процент заполненности контейнера №29 составляет 90%.',
      date: '09.01.2019.',
      address: 'ул. Монастырская, 14',
      color: 'error'
    },
    {
      type: 'ПОВРЕЖДЕНИЕ ДАТЧИКА',
      text: 'Повреждён датчик контейнера №3 (сквер у строения "Дом чекистов").',
      date: '08.01.2019.',
      address: 'ул. Сибирская, 32',
      color: 'black'
    }

  ]
}
*/
