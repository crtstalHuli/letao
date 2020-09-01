<template>
    <div>
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- 新闻列表 -->
            <div class="newsList">
                <div
                    class="newsItem"
                    v-for="item in newsList"
                    :key="item.id"
                    @click="getNewsDetail(item.id)"
                >
                    <div class="img_contain">
                        <img v-lazy="item.img_url" alt="" />
                    </div>
                    <div class="info">
                        <h3 class="title">
                            {{ item.title }}
                        </h3>
                        <div class="time_click">
                            <div>
                                发布时间：{{
                                    item.add_time
                                        | dataFormat("YYYY-MM-DD HH:mm:ss")
                                }}
                            </div>
                            <div>点击：{{ item.click }}&nbsp;次</div>
                        </div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { PullRefresh } from "vant";
import { getNewsData } from "@/api/index.js";
import moment from "moment";
export default {
    data() {
        return {
            newsList: [],
            page: 1,
            pagesize: 5,
            isLoading: false,
            count: 0,
            isAll: false
        };
    },
    components: {
        "van-pull-refresh": PullRefresh
    },
    methods: {
        async getNews() {
            var { message } = await getNewsData(this.page, this.pagesize);
            this.newsList = message;
        },
        getNewsDetail(newsid) {
            // 使用编程式导航实现跳转，
            this.$router.push(`/newsDetail/${newsid}`);
        },
        onRefresh() {
            if (this.isAll) {
                this.isLoading = false;
                this.$toast("已加载所有");
                return;
            }

            setTimeout(async () => {
                this.page = this.page + 1;
                this.pagesize = this.pagesize + 1;
                var { message } = await getNewsData(this.page, this.pagesize);
                if (message == "") {
                    this.isLoading = false;
                    this.$toast("已加载所有");
                    this.isAll = true;
                    return;
                }

                this.newsList = message.concat(this.newsList);
                this.isLoading = false;
                this.$toast("加载成功");
            }, 500);
        }
    },
    created() {
        this.$parent.showNavBar({ title: "新闻列表" });
        this.$parent.hideHeader();
        this.$parent.showFooter();
        this.getNews();
    }
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

                // 限制两行文本，超出显示省略号
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
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
