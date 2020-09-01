<template>
    <!-- <div> -->
        <!-- 新闻详情 -->
        <div class="detail-container">
            <h3 class="title">{{ newsDetail.title }}</h3>
            <div class="subtitle">
                <span>发布时间：{{ newsDetail.add_time }}</span>
                <span class="click">阅读&nbsp;{{ newsDetail.click }}</span>
            </div>
            <div class="content" v-html="newsDetail.content"></div>
            <!-- 评论 -->
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
                <van-button type="primary" size="large" @click="writeComment">评论</van-button>
            </div>
            <!-- 历史评论 -->
            <div class="list">
                <div
                    class="list-item"
                    v-for="item in commentsDataList"
                    :key="item.id"
                >
                <div class="user">
                    <div>{{ item.user_name }}：{{ item.content }}</div>
                    <div>
                        评论时间：
                        {{
                            item.add_time
                                | dataFormat("YYYY-MM-DD HH:mm:ss")
                        }}
                    </div>
                </div>
                </div>
            </div>
            <!-- 查看更多 -->
            <van-button
                plain
                type="primary"
                size="large"
                color="red"
                @click="getMore"
                >查看更多</van-button
            >
        </div>
    <!-- </div> -->
</template>

<script>
import { Field, Button } from "vant";
import { getNewsDetailData, getcommentsData,addNewsComment } from "@/api/index.js";
export default {
    props: ["newsid"],
    data() {
        return {
            newsDetail: "",
            message: "",
            pageindex: 1,
            commentsDataList: [],
            isAll: false
        };
    },
    components: {
        "van-field": Field,
        "van-button": Button
    },
    methods: {
        // 获取新闻详情
        async getNewsDetail() {
            // console.log(this.newsid);
            var res = await getNewsDetailData(this.newsid);
            this.newsDetail = res.message[0];
        },
        // 获取评论列表
        async getcommentsDataList() {
            var { message } = await getcommentsData(
                this.newsid,
                this.pageindex
            );
            this.commentsDataList = message;
        },
        // 查看更多评论
        async getMore() {
            if (this.isAll) {
                this.$toast("已加载所有评论");
                return;
            }
            this.pageindex = this.pageindex + 1;
            let { message } = await getcommentsData(
                this.newsid,
                this.pageindex
            );
            if (message == "") {
                this.isAll = true;
                this.$toast("已加载所有评论");
                return;
            }
            this.commentsDataList = this.commentsDataList.concat(message);
        },
        // 添加评论
        async writeComment() {
            var content = this.message.trim();
            if(!content){
                this.$toast('评论不能为空');
                return;
            }
            let {status,message,insertId} = await addNewsComment(this.newsid,{content:content});
            // console.log(res);
            if(status == 0){
                this.$toast(message);
                this.message = '';
                var item = {
                    add_time:new Date(),
                    content,
                    id:insertId,
                    user_name:'访客'
                };
                this.commentsDataList.unshift(item);
            }else {
                this.$toast(message)
            }
        }
    },
    created() {
        this.$parent.showNavBar({ title: "新闻列表" });
        this.$parent.hideHeader();
        this.$parent.showFooter();
        this.getNewsDetail();
        this.getcommentsDataList();
        // this.writeComment();
    }
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
            border: rgb(77, 124, 230);
        }
    }

    .content /deep/  img {
        width: 100%;
    }
    .content /deep/ table {
        width: 100%;
    }
    .list {
        .list-item {
            padding: 5px 1px;
            .user {
                background-color: #e8e8e8;
                font-size: 12px;
            }
        }
    }

    img {
        width: 100%;
    }
}
</style>
