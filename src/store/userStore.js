import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);


// 取出本地存储中用户数据，放到全局共享state中
var userDatas = JSON.parse(localStorage.getItem('userInfo') || '[]');
const store = new Vuex.Store({
    state:{
        userDatas
    }
})

export default store;
