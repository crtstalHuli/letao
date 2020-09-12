<template>
    <div>
        <van-tabs v-model="active">
            <van-tab
                v-for="item in tabList"
                :key="item.status"
                :title="item.title"
            >
                <van-card
                    v-for="order in getOrderGoods(item.status)"
                    :key="order.id"
                    :num="order.number"
                    :price="order.total_price"
                    :desc="
                        '共' + order.number + '件商品-status==' + order.status
                    "
                    :title="order.goods[0].title"
                    :thumb="order.goods[0].thumb_path"
                >
                    <template #tags>
                        <van-tag plain type="danger"
                            >付款方式：{{ order.pay_way }}</van-tag
                        >
                    </template>
                    <template #footer>
                        <van-button size="mini" :type="getTextStyle(order.status)"
                            >{{getTextType(order.status)}}</van-button
                        >
                        <van-button size="mini" type="danger"
                            >联系客服</van-button
                        >
                    </template>
                </van-card>
            </van-tab>

        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs, Card, Tag, Button } from "vant";
import { getUserOrder, getShopCarsData } from "@/api/index.js";
import { userInfo } from "@/util/tool.js";
export default {
    data() {
        return {
            active: 0,
            allOrder: [],
            tabList: [
                { title: "全部", status: "all" },
                { title: "未付款", status: "0" },
                { title: "待付款", status: "1" },
                { title: "完成", status: "2" }
            ]
        };
    },
    components: {
        "van-tabs": Tabs,
        "van-tab": Tab,
        "van-card": Card,
        "van-tag": Tag,
        "van-button": Button
    },
    methods: {
        // 获取当前用户所有订单
        async getOrder() {
            let { id } = userInfo();
            let userOrder = await getUserOrder(id);
            // console.log("userOrder:"+userOrder);

            if (Array.isArray(userOrder)) {
                // 获取所有订单商品
                let prop = [];
                userOrder.map(item => {
                    prop.push(getShopCarsData(item.goods_ids));
                });

                let orderGoods = await Promise.all(prop);
                // console.log("orderGoods:"+orderGoods);

                userOrder.map((item, index) => {
                    item.goods = orderGoods[index].message;
                });

                this.allOrder = userOrder;
                console.log("order:" + this.allOrder);
            } else {
                this.$toast(userOrder.message);
            }
        },

        // 获取对应status的订单数据
        getOrderGoods(status) {
            if(status == 'all'){
                return this.allOrder;
            }

            let goods = [];
            this.allOrder.map( item => {
                item.status == status && goods.push(item);
            })
            return goods;
        },

        // 返回订单状态对应的文本和样式
        getTextType(status){
            let statusType = new Map();
            statusType.set("0","未付款");
            statusType.set("1","已付款");
            statusType.set("2","完成");
            return statusType.get(status.toString());
            // statusType.set("0","未付款,danger");
            // statusType.set("1","已付款,default");
            // statusType.set("2","完成,primary");
            // return statusType.get(status.toString()).split(',');
        },

        // 返回订单状态对应的样式
        getTextStyle(status){
            let statusStyle = new Map();
            statusStyle.set("0","danger");
            statusStyle.set("1","default");
            statusStyle.set("2","primary");
            return statusStyle.get(status.toString());
        },
    },

    created() {
        this.$parent.showNavBar({ title: "我的订单" });
        this.$parent.hideFooter();

        this.getOrder();
        console.log(this.allOrder);
    }
};
</script>

<style lang="scss" scoped></style>
