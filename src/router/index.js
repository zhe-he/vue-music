import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend'
import Rank from '@/components/rank'
import Singer from '@/components/singer'
import Search from '@/components/search'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/rank',
            component: Rank
        },
        {
            path: '/singer',
            component: Singer
        },
        {
            path: '/search',
            component: Search
        }
    ]
})
