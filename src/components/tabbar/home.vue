<template>
    <div class="home_container">
        <!-- 轮播图  indicator-colo:指示器颜色-->
        <Swipe class="my-swipe" :autoplay="3000" :indicator-color="color">
            <van-swipe-item v-for="item in lunboList" :key="item.msg">
                <img :src="item.img" alt="" />
            </van-swipe-item>
        </Swipe>

        <!-- 8宫格 -->
        <van-grid :column-num="4" :border="false">
            <van-grid-item to="/goodsList" icon="photo-o" text="文字">
                <img src="../../assets/images/menu10.png" alt />
                <div>数码电器</div>
            </van-grid-item>
            <van-grid-item to="/newlist" icon="photo-o" text="文字">
                <img src="../../assets/images/menu19.png" alt />
                <div>乐淘头条</div>
            </van-grid-item>
            <van-grid-item to='/photo' icon="photo-o" text="文字">
                <img src="../../assets/images/menu18.png" alt />
                <div>美图欣赏</div>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="../../assets/images/menu15.png" alt />
                <div>乐淘服饰</div>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="../../assets/images/menu12.png" alt />
                <div>9.9元拼单</div>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="../../assets/images/menu15.png" alt />
                <div>话费充值</div>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="../../assets/images/menu16.png" alt />
                <div>物流查询</div>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字">
                <img src="../../assets/images/menu17.png" alt />
                <div class="text">全部</div>
            </van-grid-item>
        </van-grid>

        <!-- 商品列表 -->
        <div class="recommend">
            <van-divider>为你推荐</van-divider>

            <div class="goodList">
                <div
                    class="item"
                    v-for="item in recommendList"
                    :key="item.id"
                    @click="getGoodsdetail(item.id)"
                >
                    <img v-lazy="item.img_url" alt="" />
                    <div class="text">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <div class="footer">
                            <span class="price">
                                &yen;&nbsp;{{ item.sell_price }}
                            </span>
                            <span class="buy">{{ item.buy }}人已购买</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- goodlist -->
    </div>
</template>

<script>
import {
    Search,
    Sticky,
    Swipe,
    SwipeItem,
    Grid,
    GridItem,
    Divider
} from "vant";
import { getLunBoData, getRecommendData } from "@/api/index.js";
export default {
    name: "HomeComponent",
    data() {
        return {
            lunboList: [],
            recommendList: [],
            color: "#ccc"
        };
    },
    components: {
        Search,
        Sticky,
        Swipe,
        "van-swipe-item": SwipeItem,
        "van-grid": Grid,
        "van-grid-item": GridItem,
        "van-divider": Divider
    },
    methods: {
        // 获取轮播图数据
        async getlunbo() {
            var res = await getLunBoData();
            this.lunboList = res.message;
        },
        // 获取用户列表数据
        async getRecommend() {
            var res = await getRecommendData();
            this.recommendList = res.message;
        },
        getGoodsdetail(goodsId) {
            this.$router.push(`/goodsDesc/${goodsId}`);
        }
    },
    created() {
        this.$parent.hideNavBar();
        this.$parent.showHeader();
        this.$parent.showFooter();
        this.getlunbo();
        this.getRecommend();
    }
};
</script>

<style lang="scss" scoped>
.home_container {
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

    // 轮播图
    .my-swipe {
        height: 200px;
        .van-swipe-item {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    // 8宫格
    .van-grid {
        background-color: #fff;
        .van-grid-item {
            // padding: 16px 8px;
            padding: 8px 2px;
            img {
                width: 50%;
            }
            .text {
                margin-top: 3px;
                color: #524949;
                // font-style: 15px;
            }
        }
    }

    // 商品列表
    .recommend {
        padding: 0 8px;

        // 为你推荐
        .van-divider {
            text-align: center;
            color: #333;
            font-size: 16px;
            border-color: #545e6c;
        }

        // 商品列表
        .goodList {
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
                    padding: 6px;

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
    }
}
</style>
