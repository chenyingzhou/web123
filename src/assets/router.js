import Vue from "vue";
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/main',
    component: Main
  }
]
export default new VueRouter({
  routes,
  mode: 'hash'
})
