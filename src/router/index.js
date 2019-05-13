import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

const router = new Router({
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
            children: [
                {
                    path: '/overalldata',
                    name: 'overalldata',
                    component: resolve => require(['./../components/data/overalldata.vue'],resolve),
                },
                {
                    path: '/salesDepartmentData',
                    name: 'salesDepartmentData',
                    component: resolve => require(['./../components/data/salesDepartmentData.vue'],resolve)
                },
                {
                    path: '/customerInfo',
                    name: 'customerInfo',
                    component: resolve => require(['./../components/custom/customerInfo.vue'],resolve)
                },
                {
                    path: '/customerArrangement',
                    name: 'customerArrangement',
                    component: resolve => require(['./../components/custom/customerArrangement.vue'],resolve)
                },
                {
                    path: '/visitingRecord',
                    name: 'visitingRecord',
                    component: resolve => require(['./../components/custom/visitingRecord.vue'],resolve)
                },
                {
                    path: '/companyInfo',
                    name: 'companyInfo',
                    component: resolve => require(['./../components/organization/companyInfo.vue'],resolve)
                },
                {
                    path: '/department',
                    name: 'department',
                    component: resolve => require(['./../components/organization/department.vue'],resolve)
                },
                {
                    path: '/staff',
                    name: 'staff',
                    component: resolve => require(['./../components/organization/staff.vue'],resolve)
                },
                {
                    path: '/device',
                    name: 'device',
                    component: resolve => require(['./../components/organization/device.vue'],resolve)
                },
                {
                    path: '/announcement',
                    name: 'announcement',
                    component: resolve => require(['./../components/setting/announcement.vue'],resolve)
                },
                {
                    path: '/voice',
                    name: 'voice',
                    component: resolve => require(['./../components/setting/voice.vue'],resolve)
                },
                {
                    path: '/system',
                    name: 'system',
                    component: resolve => require(['./../components/setting/system.vue'],resolve)
                },
                {
                    path: '/account',
                    name: 'account',
                    component: resolve => require(['./../components/setting/account.vue'],resolve)
                },
                {
                    path: '/default',
                    name: 'default',
                    component: resolve => require(['./../components/setting/default.vue'],resolve)
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: resolve => require(['./../components/custom/tag.vue'],resolve)
                },
                {
                    path: '/matter',
                    name: 'matter',
                    component: resolve => require(['./../components/custom/matter.vue'],resolve)
                },
                {
                    path: '/like',
                    name: 'like',
                    component: resolve => require(['./../components/custom/like.vue'],resolve)
                },
                {
                    path: '/index',
                    name: 'index',
                    component: resolve => require(['./../components/page/myIndex.vue'],resolve)
                }
            ]
        },
    ]
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');

        if (token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;


