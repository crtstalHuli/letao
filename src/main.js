import Vue from "vue";
import App from "./App.vue";
import store from './store.js'
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


new Vue({
    router,
    render: h => h(App),
    store
}).$mount("#app");
