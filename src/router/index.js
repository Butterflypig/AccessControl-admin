import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'login',
			component: resolve => require(['./../components/page/login.vue'],resolve),
		},
		{
			path: '/home',
			name: 'home',
			component: resolve => require(['./../components/index.vue'],resolve),
			children: [{
				path: 'overalldata',
				name: 'overalldata',
				component: resolve => require(['./../components/page/overalldata.vue'],resolve),
			}]
		}
	]
})
