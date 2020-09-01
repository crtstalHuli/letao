<template>
    <div class="car_container">
        <div class="goods_list" v-if="isShow">
            <div class="goods_item">
                <!-- 开关 -->
                <van-switch v-model="checked" />
                <!-- 商品图片 -->
                <div class="thumbImage">
                    <img src="http://test.w0824.com/nk2-thumb.jpg" alt="" />
                </div>
                <!-- 商品内容 -->
                <div class="goodsInfo">
                    <div class="title">
                        尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）
                    </div>
                    <div class="row">
                        <span class="price">&yen;1234</span>
                        <van-stepper v-model="value" />
                        <van-button type="danger" class="detel">删除</van-button>
                    </div>
                </div>
                <!--  -->
            </div>

            <!-- 提交订单 -->
            <van-submit-bar
                :price="3050"
                button-text="提交订单"
                @submit="onSubmit"
            >
                <div class="count">共{{count}}件商品</div>
            </van-submit-bar>
        </div>
        <!-- 购物车为空 -->
        <div class="empty" v-else>
            <h3>亲，您的购物车为空，去<a href="/home">首页</a>逛逛吧</h3>
            <div>
                <img src="@/assets/images/car.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import { Switch, Stepper, Button, SubmitBar } from "vant";
export default {
    data() {
        return {
            isShow: true,
            checked: true,
            value: 1,
            count:0
        };
    },
    components: {
        "van-switch": Switch,
        "van-stepper": Stepper,
        "van-button": Button,
        "van-submit-bar": SubmitBar
    },
    methods: {
        onSubmit() {}
    },
    created() {
        this.$parent.showNavBar({ title: "我的购物车" });
        this.$parent.hideHeader();
        this.$parent.showFooter();
    }
};
</script>

<style lang="scss" scoped>
.car_container {
    // 购物车为空
    .empty {
        text-align: center;
        h3 {
            margin-bottom: 0;
        }
    }

    // 购物车
    .goods_list {
        padding: 10px 5px;

        .goods_item {
            display: flex;
            // justify-content: space-between;
            align-items: center;

            padding: 8px;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #fff;

            // 商品图片
            .thumbImage {
                margin: 3px;

                img {
                    width: 50px;
                }
            }
            .goodsInfo {
                flex: 1;
                .title {
                    overflow: hidden;

                    // 限制两行文本，超出显示省略号
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }
                .row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
        .van-submit-bar {
            bottom: 50px;
        }
    }
}
</style>
