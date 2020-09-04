<template>
    <div class="app_container">
        <!-- navbar -->
        <Sticky>
            <van-nav-bar
                v-show="isShowNavBar"
                :title="title"
                left-text=""
                left-arrow
                @click-left="$router.go(-1)"
            />
        </Sticky>

        <!-- 头部 -->
        <Sticky>
            <div class="hearder" v-show="isHeader">
                <img src="@/assets/images/logo.png" alt="" />
                <Search placeholder="请输入搜索关键词" />
            </div>
        </Sticky>

        <!-- 主体 -->
        <router-view></router-view>
        <!-- 底部 -->
        <Tabbar v-model="active" v-show="isFooter">
            <TabbarItem to="/home" icon="wap-home-o">首页</TabbarItem>
            <TabbarItem to="/mycar" icon="cart-o" :badge="$store.getters.getTotalNum">购物车</TabbarItem>
            <TabbarItem to="/user" icon="user-o">我的乐淘</TabbarItem>
        </Tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem, NavBar, Sticky, Search } from "vant";
export default {
    data() {
        return {
            // 底部：默认首页高亮
            active: 0,
            title: "",
            isShowNavBar: false,
            isHeader: true,
            isFooter:true,
            mycarCount:0,

        };
    },
    components: {
        Tabbar,
        TabbarItem,
        "van-nav-bar": NavBar,
        Sticky,
        Search
    },
    methods: {
        // 控制navbar显示
        showNavBar(options) {
            this.title = options.title;
            this.isShowNavBar = true;
        },
        hideNavBar() {
            this.isShowNavBar = false;
        },
        showHeader() {
            this.isHeader = true;
        },
        hideHeader() {
            this.isHeader = false;
        },
        showFooter(){
            this.isFooter = true;
        },
        hideFooter(){
            this.isFooter = false;
        },


    }
};
</script>

<style lang="scss" scoped>
.app_container {
    min-width: 320px;
    max-width: 750px;
    margin: auto;
    margin-bottom: 50px;

    // 头部
    .hearder {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px;
        background-color: #fff;

        img {
            height: 44px;
        }

        .van-search {
            flex: 1;
        }
    }
}
</style>
