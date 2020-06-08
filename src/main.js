import Vue      from 'vue'
import App      from './App.vue'
import router   from './router'
import store    from './store'
import vuetify  from './plugins/vuetify';
import moment   from './plugins/moment';
import lodash   from './plugins/lodash';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  moment,
  lodash,
  render: h => h(App)
}).$mount('#app')
