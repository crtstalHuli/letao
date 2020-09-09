import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/components/tabbar/home.vue";
import mycar from "@/components/tabbar/mycar.vue";
import user from "@/components/tabbar/user.vue";
import newList from "@/components/news/newList.vue";
import goodsList from "@/components/goods/goodsList.vue";
import newsDetail from "@/components/news/newsDetail.vue";
import goodsDesc from "@/components/goods/goodsDesc.vue";
import photo from "@/components/photo/photo.vue";
import login from "@/components/user/login.vue";
import register from "@/components/user/register.vue";
import myorder from "@/components/order/myorder.vue";
import address from '@/components/address/addressManager.vue';
import addressadd from '@/components/address/addressAdd.vue';
import addressedit from '@/components/address/addressEdit.vue';

Vue.use(VueRouter);

// 实例化路由对象，写路由匹配规则
const routes = [
    {
        path: "/",
        name: "home",
        component: home
    },
    {
        path: "/home",
        name: "home",
        component: home
    },
    {
        path: "/mycar",
        name: "mycar",
        component: mycar
    },
    {
        path: "/user",
        name: "user",
        component: user
    },
    {
        path: "/newList",
        name: "newList",
        component: newList
    },
    {
        path: "/goodsList",
        name: "goodsList",
        component: goodsList
    },
    {
        path: "/newsDetail/:newsid",
        name: "newsDetail",
        component: newsDetail,
        props: true
    },
    {
        path: "/goodsDesc/:goodsid",
        name: "goodsDesc",
        component: goodsDesc,
        props: true
    },
    {
        path: "/photo",
        name: "photo",
        component: photo
    },
    {
        path: "/login",
        name: "login",
        component: login
    },
    {
        path: "/register",
        name: "register",
        component: register
    },
    {
        path: "/myorder",
        name: "myorder",
        component: myorder
    },
    {
        path: "/address",
        name: "address",
        component: address
    },
    {
        path: "/addressadd",
        name: "addressadd",
        component: addressadd
    },
    {
        path: "/addressedit/:addressInfo",
        name: "addressedit",
        component: addressedit
    },
];
const router = new VueRouter({
    routes
});

// 全局路由前置守卫导航
router.beforeEach((to,from,next) => {
    // console.log(to.path);
    // console.log(from.path);
    if(to.path === '/home'){
        // nextTick页面加载完后在执行
        Vue.nextTick( () => {
            document.getElementById('hearder').style = '';
        })

    }else {
        Vue.nextTick( () => {
            document.getElementById('hearder').style.display = 'none';
        } )

    }
    next();
})
export default router;

