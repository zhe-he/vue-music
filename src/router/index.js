import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend'
import Rank from '@/components/rank'
import Singer from '@/components/singer'
import Search from '@/components/search'
import SingerDetail from '@/components/singer-detail'
import Disc from '@/components/disc'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend,
            children: [
                {
                    path: ':id',
                    component: Disc
                }
            ]
        },
        {
            path: '/rank',
            component: Rank
        },
        {
            path: '/singer',
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/search',
            component: Search
        }
    ]
})
