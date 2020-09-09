<template>
    <div>
        <!-- 商品列表 -->
        <div class="goodsList">
            <div
                class="item"
                v-for="item in goodsList"
                :key="item.id"
                @click="getGoodsdetail(item.id)"
            >
                <img v-lazy="item.img_url" alt="" />
                <div class="text">
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="price">
                        <span class="shopPrice">
                            &yen;&nbsp;{{ item.sell_price }}
                        </span>
                        <span class="marketPrice"
                            >&yen;&nbsp;{{ item.market_price }}</span
                        >
                    </div>
                    <div class="hot">
                        <span>热卖中</span>
                        <span>剩{{ item.stock_quantity }}件</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 加载更多 -->
        <van-button
            type="primary"
            size="large"
            :color="color"
            @click="getMoreGoods"
            >加载更多</van-button
        >
    </div>
</template>

<script>
import { Button, Toast } from "vant";
import { getGoodsListData } from "@/api/index.js";
export default {
    name: "GoodsComponent",
    data() {
        return {
            page: 1,
            goodsList: [],
            color:'red',
            allcount: 0,
            isAll: false
        };
    },
    components: {
        "van-button": Button
    },
    methods: {
        // 获取商品列表
        async getGoods() {
            let { message } = await getGoodsListData(this.page);
            this.goodsList = message;
        },
        // 获取更多的商品
        async getMoreGoods() {

            if (this.isAll) {
                this.$toast("已加载所有商品");
                return;
            }
            this.page = this.page+1;
            var { message } = await getGoodsListData(this.page);
            if(message.length == 0){
                this.isAll = true;
                this.$toast("加载完毕");
                return;
            }
            this.goodsList = this.goodsList.concat(message);
        },
        // 跳转到商品详情页面
        async getGoodsdetail(goodsid) {
            this.$router.push(`/goodsDesc/${goodsid}`);
        }
    },
    created() {
        this.$parent.showNavBar({ title: "商品列表" });
        // this.$parent.hideHeader();
        this.$parent.showFooter();
        this.getGoods();
    }
};
</script>

<style lang="scss" scoped>
// 商品列表
.goodsList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0px 8px;
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

                // 限制两行文本，超出显示省略号
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            .price {
                padding: 10px 0;

                .shopPrice {
                    font-size: 14px;
                    color: red;
                    padding: 10px 0;
                    font-weight: 700;
                }
                .marketPrice {
                    margin-left: 10px;
                    font-size: 12px;
                    color: #999;
                    text-decoration: line-through;
                }
            }

            .hot {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
            }
        }
    }
}

</style>
