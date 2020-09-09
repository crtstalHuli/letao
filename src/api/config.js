import axios from "axios";
import { Toast } from "vant";
import router from "@/router/index.js";
import store from "@/store/store.js";
import { sleep } from '@/util/tool.js';

const instance = axios.create({
    baseURL: "http://api.w0824.com/api"
});

// 添加请求拦截器
instance.interceptors.request.use(
    async function(config) {
        // 在发送请求之前做些什么
        // console.log(config);
        let token = localStorage.getItem("token") || "";
        token && (config.headers["token"] = token);

        // If-Modified-Since 是标准的HTTP请求头标签，在发送HTTP请求时，
        // 把浏览器端缓存页面的最后修改时间一起发到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行比较
        config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，获取最新数据


        // 设置对应loding
        !store.state.isPending && store.commit("changeIsPending", true);
        await sleep(300)
        // console.log("interceptors.reuqest", store.state.isPending); //true
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        // 关闭loding
        store.commit("changeIsPending", false);
        // console.log("response.request", store.state.isPending); //false
        return response.data;
    },
    function(error) {
        store.commit("changeIsPending", false);
        // console.log(error.response.status);
        // console.log(error.response.data.message);
        let status = error.response.status;
        let message = error.response.data.message;
        switch (status) {
            case 401:
                Toast("用户信息过期，请重新登录");
                router.push("/login");
                break;
            default:
                Toast("网络错误，请稍后再试");
        }
        // 对响应错误做点什么
        // return Promise.reject(error);
    }
);

export default instance;
