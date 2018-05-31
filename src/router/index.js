import Vue from 'vue'
import Router from 'vue-router'

const Recommend = () => import(/* webpackChunkName: "recommend" */ '@/components/recommend')
const Rank = () => import(/* webpackChunkName: "rank" */ '@/components/rank')
const Singer = () => import(/* webpackChunkName: "singer" */ '@/components/singer')
const Search = () => import(/* webpackChunkName: "search" */ '@/components/search')
const SingerDetail = () => import(/* webpackChunkName: "singer-detail" */ '@/components/singer-detail')
const Disc = () => import(/* webpackChunkName: "disc" */ '@/components/disc')
const TopList = () => import(/* webpackChunkName: "top-list" */ '@/components/top-list')
const UserCenter = () => import(/* webpackChunkName: "user-center" */ '@/components/user-center')

Vue.use(Router);

export default new Router({
    mode: 'history',
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
