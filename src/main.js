/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Home from './components/headerRouters/Home.vue'
import Now from './components/headerRouters/Now.vue'
import Release from './components/headerRouters/Release.vue'
import Details from './components/headerRouters/nowRouters/Details.vue'
import ResumeDetails from './components/headerRouters/nowRouters/detailsRouters/ResumeDetails.vue'
import Authority from './components/headerRouters/Authority.vue'

import Router from 'vue-router'
import './components/XhwlHeader.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/animate.css'
import '../static/css/main.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router)
const routes = [
  { path: '', component: Home },
  { path: '/Now', component: Now},
  { path: '/Release', component: Release},
  { path: '/Details', component: Details},
  { path: '/ResumeDetails', component: ResumeDetails},
  { path: '/Authority', component: Authority}
]
const router = new Router({
  routes // （缩写）相当于 routes: routes
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
