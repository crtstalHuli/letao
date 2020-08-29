import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
Vue.prototype.$api = axios;
Vue.config.productionTip = false

// 注册时可以配置额外的选项(实现图片懒加载)
import { Lazyload,Toast } from "vant";
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(Toast);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
