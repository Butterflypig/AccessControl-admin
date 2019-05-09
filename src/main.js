// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

//qs
import qs from 'qs';
Vue.prototype.$qs = qs;

//vuex
import store from './store'

// api
import api from './api/api'
axios.defaults.baseURL = 'http://www.reception.com';
Vue.prototype.$api = api;

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers['Authorization'] = localStorage.getItem('Authorization');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    });

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//  echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// axios
Vue.prototype.$axios = axios;









Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
