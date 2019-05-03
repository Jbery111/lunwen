import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import vueResource from 'vue-resource';
import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
Vue.use(YDUI);
Vue.use(vueResource);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
