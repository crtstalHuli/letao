<template>
    <div class="goodsDesc_container">
        <transition>
           <van-icon name="star-o" color="red" />
        </transition>
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" :indicator-color="'#ccc'" v-if="isLunbo">
            <van-swipe-item v-for="image in lunboimages" :key="image.src">
                <img :src="image.src" alt="" />
            </van-swipe-item>
        </van-swipe>
        <van-empty image="error" description="暂无图片" v-else />
        <div class="goodsInfo">
            <div class="goodsName">
                <span>{{ goodsInfo.title }}</span>
            </div>
            <van-divider />
            <div class="price">
                <span class="marketPrice"
                    >市场价：&yen;{{ goodsInfo.market_price }}</span
                >
                <span class="shopPrice">
                    本店价：
                    <span class="value">&yen;{{ goodsInfo.sell_price }}</span>
                </span>
            </div>
            <div class="goodsNumber">
                <span>购买数量：</span>
                <van-stepper v-model="value" />
            </div>
        </div>
        <div class="goodsItem">
            <van-divider>其他信息</van-divider>
            <div class="goodsOtherInfo">
                <span>商品货号：{{ goodsInfo.goods_no }}</span>
                <span>库存情况：{{ goodsInfo.stock_quantity }}</span>
                <span
                    >上架时间：{{
                        goodsInfo.add_time | dataFormat("YYYY-MM-DD")
                    }}</span
                >
            </div>
        </div>
        <div class="goodsItem">
            <van-divider>介绍</van-divider>
            <div class="content" v-html="goodsDesc.content"></div>
        </div>

        <!-- 商品导航 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" dot />
            <van-goods-action-icon
                icon="cart-o"
                text="购物车"
                :badge="$store.getters.getTotalNum"
                to="/mycar"
            />
            <van-goods-action-button
                color="#be99ff"
                type="warning"
                text="加入购物车"
                @click="addmycar"
            />
            <van-goods-action-button
                color="#7232dd"
                type="danger"
                text="立即购买"
            />
        </van-goods-action>
    </div>
</template>

<script>
import {
    Swipe,
    SwipeItem,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Icon,
    Divider,
    Stepper,
    Empty
} from "vant";

import {
    getGoodsDescData,
    getthgetumbimages,
    getgoodsinfo,
    isLogin
} from "@/api/index.js";

export default {
    props: ["goodsid"],
    data() {
        return {
            count: 0,
            lunboimages: [],
            isLunbo:true,
            goodsInfo: {},
            goodsDesc: "",
            value: 1,
            carData:[]
        };
    },
    components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem,
        "van-goods-action": GoodsAction,
        "van-goods-action-icon": GoodsActionIcon,
        "van-goods-action-button": GoodsActionButton,
        "van-icon": Icon,
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem,
        "van-divider": Divider,
        "van-stepper": Stepper,
        "van-empty":Empty
    },
    methods: {
        // 获取商品图文
        async getGoodsDesc() {
            let res = await getGoodsDescData(this.goodsid);
            this.goodsDesc = res.message[0];
        },
        // 获取轮播图数据
        async getthgetumbimagesData() {
            let { message } = await getthgetumbimages(this.goodsid);
            message.length == 0 ? this.isLunbo = false : this.isLunbo = true;

            this.lunboimages = message;
        },
        // 获取商品参数，价格，标题
        async getgoodsinfoData() {
            let { message } = await getgoodsinfo(this.goodsid);
            this.goodsInfo = message;
        },
        // 加入购物车
        addmycar() {
            isLogin();
            let goods = {
                id:this.goodsInfo.id,
                number:this.value,
                price:this.goodsInfo.sell_price,
                selected:true
            };

            this.$store.commit('addCar',goods);
        }
    },
    created() {
        this.$parent.showNavBar({ title: "商品详情" });
        // this.$parent.hideHeader();
        this.$parent.hideFooter();

        this.getGoodsDesc();
        this.getthgetumbimagesData();
        this.getgoodsinfoData();



    }
};
</script>

<style lang="scss" scoped>
.goodsDesc_container {
    padding: 5px 5px 50px 5px;

    .van-icon {
        position: absolute;
    }
    .van-swipe {
        height: 240px;
        border-radius: 5px;
        background-color: #fff;

        .van-swipe-item {
            display: flex;
            justify-content: center;
            img {
                width: 254px;
                height: 100%;
            }
        }
    }

    .goodsInfo {
        padding: 8px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #fff;

        .goodsName {
            color: #333;
        }

        .van-divider {
            margin: 16px 0;
            color: #969799;
            border-color: #ebedf0;
        }

        .price {
            margin-bottom: 15px;
            color: #333;

            .marketPrice {
                margin-right: 20px;
                text-decoration: line-through;
            }
            .shopPrice {
                .value {
                    color: red;
                    font-weight: 700;
                }
            }
        }

        .goodsNumber {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            margin-bottom: 10px;
            color: #333;

            .van-stepper {
                display: inline-block;
            }
        }
    }

    .goodsItem {
        padding: 8px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #fff;

        .goodsOtherInfo {
            display: flex;
            flex-direction: column;
        }

        .content /deep/ img {
            width: 100%;

            // 行内元素对齐
            vertical-align: top;
        }
        .content /deep/ table {
            width: 100%;
             vertical-align: top;
        }
    }
}
</style>
