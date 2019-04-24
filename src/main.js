// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// api
import api from './api/api'
axios.defaults.baseURL = 'http://www.reception.com';
Vue.prototype.$api = api;

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//  echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// axios
import axios from 'axios'
Vue.prototype.$axios = axios;


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
