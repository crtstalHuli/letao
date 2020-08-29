<template>
  <div>
    <!-- 头部 -->
    <Sticky>
      <van-nav-bar title="商品列表" left-text="" left-arrow> </van-nav-bar>
    </Sticky>

    <!-- 商品详情 -->
    <div class="goodsdetail_container" v-html="goodsDesc.content">
      <!-- 轮播图 -->
      <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe> -->

    </div>
  </div>
</template>

<script>
import { Sticky, NavBar, Swipe, SwipeItem } from "vant";
import { getGoodsDescData } from "@/api/index.js";
export default {
  props: ["goodsid"],
  data() {
    return {
      goodsDesc: "",
    };
  },
  components: {
    Sticky,
    "van-nav-bar": NavBar,
    "van-swipe":Swipe,
    "van-swipe-item":SwipeItem
  },
  methods: {
    async getGoodsDesc() {
      let res = await getGoodsDescData(this.goodsid);
      this.goodsDesc = res.message[0];
      console.log(res.message[0]);
    },
  },
  created() {
    this.getGoodsDesc();
  },
};
</script>

<style lang="scss" scoped>
.goodsdetail_container {
  padding: 5px 5px 50px 5px;
}
</style>
