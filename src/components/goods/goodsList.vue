<template>
  <div>
    <!-- 头部 -->
    <Sticky>
      <van-nav-bar title="商品列表" left-text="" left-arrow> </van-nav-bar>
    </Sticky>

    <!-- 商品列表 -->
    <div class="goodsList">
      <div class="item" v-for="item in goodsList" :key="item.id">
        <img v-lazy="item.img_url" alt="" />
        <div class="text">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="footer">
            <span class="price"> &yen;&nbsp;{{ item.sell_price }} </span>
            <span class="buy">{{ item.buy }}人已购买</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载更多 -->
    <van-button type="primary" size="large" :color='color' @click='getGoodsLength'>加载更多</van-button>
  </div>
</template>

<script>
import { Sticky,NavBar,Button   } from "vant";
import { getRecommendData } from "@/api/index.js";
export default {
  name: "GoodsComponent",
  data() {
    return {
      goodsList: [],
      color:'red',
      allcount:0
    };
  },
  components: {
    Sticky,
    "van-nav-bar": NavBar,
    "van-button":Button
  },
  methods: {
    async getGoods() {
      let res = await getRecommendData();
      this.goodsList = res.message;
    },
    async getGoodsLength(){
      
      var goodsCount = this.goodsList.length;
      let res = await getRecommendData(goodsCount + 4);
      if(res.message.length == goodsCount){
        this.$toast('已加载所有商品');
        return;
      }
      this.goodsList = res.message;
    },
    
  },
  created() {
    this.getGoods();
    this.getGoodsLength();
  },
};
</script>

<style lang="scss" scoped>
// 商品列表
.goodsList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 48%;
    border-radius: 6px;
    margin: 4px 0;
    overflow: hidden;
    background-color: #fff;

    img {
      width: 100%;
    }

    .text {
      display: flex;
      flex-direction: column;

      .title {
        font-size: 12px;
        color: #333;
      }

      .footer {
        padding: 10px 0;

        .price {
          font-size: 14px;
          color: #f50;
          padding: 10px 0;
        }
        .buy {
          margin-left: 10px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
