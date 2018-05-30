import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend'
import Rank from '@/components/rank'
import Singer from '@/components/singer'
import Search from '@/components/search'
import SingerDetail from '@/components/singer-detail'
import Disc from '@/components/disc'
import TopList from '@/components/top-list'
import UserCenter from '@/components/user-center'

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
            component: Rank,
            children: [
                {
                    path: ':id',
                    component: TopList
                }
            ]
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
            component: Search,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/user',
            component: UserCenter
        }
    ]
})
