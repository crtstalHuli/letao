<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="新闻详情" left-text="" left-arrow> </van-nav-bar>

    <!-- 新闻详情 -->
    <div class="detail-container">
      <h3 class="title">{{ newsDetail.title }}</h3>
      <div class="subtitle">
        <span>发布时间：{{ newsDetail.add_time }}</span>
        <span class="click">阅读&nbsp;{{ newsDetail.click }}</span>
      </div>
      <div class="content" v-html="newsDetail.content"></div>
      <div class="comment">
        <van-field
          v-model="message"
          rows="2"
          autosize
          label=""
          type="textarea"
          maxlength="50"
          placeholder="有爱评论，说点好听的..."
          show-word-limit
        />
        <van-button type="primary" size="large">评论</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Field,Button  } from "vant";
import { getNewsDetailData } from "@/api/index.js";
export default {
  props: ["newsid"],
  data() {
    return {
      newsDetail: "",
      message:''
    };
  },
  components: {
    "van-nav-bar": NavBar,
    "van-field": Field,
    "van-button":Button
  },
  methods: {
    async getNewsDetail() {
      // console.log(this.newsid);
      var res = await getNewsDetailData(this.newsid);
      this.newsDetail = res.message[0];
      console.log(this.newsDetail);
    },
  },
  created() {
    this.getNewsDetail();
  },
};
</script>

<style lang="scss" scoped>
.detail-container {
  padding: 0 10px;
  background-color: #faf9f9;

  .title {
    padding: 10px 0;
    text-align: center;
    font-size: 16px;
    color: #404040;
  }

  .subtitle {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid #888;
    font-size: 13px;
    color: #888;
  }
  .comment {
      .van-button--primary {
          background-color: rgb(77, 124, 230);
          border:rgb(77, 124, 230);
      }
  }

}
</style>
