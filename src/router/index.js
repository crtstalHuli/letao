import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/components/tabbar/home.vue';
import mycar from '@/components/tabbar/mycar.vue';
import user from '@/components/tabbar/user.vue';
import newList from '@/components/news/newList.vue';
import goodsList from '@/components/goods/goodsList.vue';
import newsDetail from '@/components/news/newsDetail.vue';
import goodsDesc from '@/components/goods/goodsDesc.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/home',
    name: 'home',
    component:home
  },
  {
    path: '/mycar',
    name: 'mycar',
    component:mycar
  },
  {
    path: '/user',
    name: 'user',
    component:user
  },
  {
    path: '/newList',
    name: 'newList',
    component:newList
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    component:goodsList
  },
  {
    path: '/newsDetail/:newsid',
    name: 'newsDetail',
    component:newsDetail,
    props: true
  },
  {
    path: '/goodsDesc/:goodsid',
    name: 'goodsDesc',
    component:goodsDesc,
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router