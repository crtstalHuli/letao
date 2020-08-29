<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="新闻列表" left-text="" left-arrow> </van-nav-bar>

    <!-- 新闻列表 -->
    <div class="newsList">
      <div class="newsItem" v-for="item in newsList" :key="item.id" @click='getNewsDetail(item.id)'>
        <div class="img_contain">
          <img v-lazy="item.img_url" alt="" />
        </div>
        <div class="info">
            <h3 class="title">{{item.title}}</h3>
            <div class="time_click">
              <div>发布时间：{{item.add_time}}</div>
              <div>点击：{{item.click}}&nbsp;次</div>
            </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
import { getNewsData } from "@/api/index.js";
// import moment from 'moment';
export default {
  data() {
    return {
      newsList: [],
    };
  },
  components: {
    "van-nav-bar": NavBar,
  },
  methods: {
    async getNews() {
      var res = await getNewsData();
      this.newsList = res.message;
    },
    getNewsDetail(newsid){
        // 使用编程式导航实现跳转，
        this.$router.push(`/newsDetail/${newsid}`)
    }
  },
  created() {
    this.getNews();
  },
};
</script>

<style lang="scss" scoped>
.newsList {
  .newsItem {
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-top: 2px;

    .img_contain {
      width: 100px;
      height: 100px;

      img {
        width: 100px;
        height: 100%;
      }
    }

    .info {
      padding: 2px; 
      width: 100%;

      .title {
        font-size: 13px;
        margin-bottom: 14px;
      }

      .time_click {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #888;
      }
    }
  }
}
</style>
