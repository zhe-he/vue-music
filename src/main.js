import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
// import store from './store'

import 'common/stylus/index.styl'

FastClick.attach(document.body)

new Vue({
    el: '#app',
    router,
    // store,
    render: h => h(App)
})
