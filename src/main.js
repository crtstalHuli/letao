import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 全局过滤器
import "@/util/filter.js";
import axios from "axios";
import { Lazyload, Toast } from "vant";

Vue.prototype.$api = axios;
Vue.prototype.$toast = Toast;
Vue.config.productionTip = false;



// 注册时可以配置额外的选项(实现图片懒加载),轻提示

Vue.use(Lazyload, {
    lazyComponent: true
});

// 导入购物车的store
import store from '@/store/store.js'
// 导入用户的store
import userStore from '@/store/userStore.js'
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
