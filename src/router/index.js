import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component:  () => import(/* webpackChunkName: "index" */ '../views/home.vue')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path) {
        // eslint-disable-next-line no-undef
        _hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
    next()
})

export default router
