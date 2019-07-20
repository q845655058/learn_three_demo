import Vue from 'vue'
import Router from 'vue-router'

const Demo1 = () => import('@/components/demo1')
const Demo2 = () => import('@/components/demo2')
const Demo3 = () => import('@/components/demo3')
const Demo4 = () => import('@/components/demo4')
const Demo5 = () => import('@/components/demo5')
const Demo6 = () => import('@/components/demo6')
const Demo7 = () => import('@/components/demo7')
const Demo8 = () => import('@/components/demo8')
const Demo9 = () => import('@/components/demo9')
const Demo10 = () => import('@/components2/demo10')
const Demo11 = () => import('@/components2/demo11')
const Demo12 = () => import('@/components2/demo12')
const Demo13 = () => import('@/components2/demo13')
const Demo14 = () => import('@/components2/demo14')
const Demo15 = () => import('@/components2/demo15')

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [{
    path: '/',
    redirect: '/demo',
    name: '主页'
    }, {
    path: '/demo',
    component: Demo15,
    name: 'demo'
    }]
})
