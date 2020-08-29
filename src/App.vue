<template>
  <div class="app_container">
    <!-- 主体 -->
    <router-view></router-view>
    <!-- 底部 -->
    <Tabbar v-model="active">
      <TabbarItem to='/home' icon="wap-home-o">首页</TabbarItem>
      <TabbarItem to='/mycar' icon="cart-o">购物车</TabbarItem>
      <TabbarItem to='/user' icon="user-o">我的乐淘</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  data(){
    return {
      // 底部：默认首页高亮
      active:0
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
};
</script>

<style lang="scss" scoped>


  .app_container {
  min-width: 320px;
  max-width: 750px;
  margin: auto;
  margin-bottom: 50px;
  
}


</style>
