import 'babel-polyfill'
import Promise from 'promise-polyfill'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
// import store from './store'
import '@/common/stylus/index.styl'

if (!window.Promise) {
    window.Promise = Promise
}

FastClick.attach(document.body)

Vue.use(VueLazyload, {
    loading: require('@/common/image/default.png')
})

new Vue({
    el: '#app',
    router,
    // store,
    render: h => h(App)
})
