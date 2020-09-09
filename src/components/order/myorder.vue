<template>
    <div>
        <van-tabs v-model="active">
            <van-tab title="全部">
                <van-card
                    num="2"
                    price="2.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                >
                    <template #tags>
                        <van-tag plain type="danger">标签</van-tag>
                        <van-tag plain type="danger">标签</van-tag>
                    </template>
                    <template #footer>
                        <van-button size="mini">按钮</van-button>
                        <van-button size="mini">按钮</van-button>
                    </template>
                </van-card>
            </van-tab>
            <van-tab title="待付款">待付款</van-tab>
            <van-tab title="待收货">待收货</van-tab>
            <van-tab title="已完成">已完成</van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs, Card,Tag,Button } from "vant";
export default {
    data() {
        return {
            active: 1
        };
    },
    components: {
        "van-tabs": Tabs,
        "van-tab": Tab,
        "van-card": Card,
        "van-tag": Tag,
        "van-button": Button
    },
    created() {
        this.$parent.showNavBar({ title: "我的订单" });
        // this.$parent.hideHeader();
        this.$parent.hideFooter();
    }
};
</script>

<style lang="scss" scoped></style>
