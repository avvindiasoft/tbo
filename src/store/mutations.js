// https://vuex.vuejs.org/en/mutations.html

export default {
  addNotification(state, obj){
    // изменяем состояние
    //state.notifications.push(obj);
    state.notifications.unshift(obj);
  },

  addNotifsTop(state, str){
    state.notifsTop.unshift(str);
  }
}
