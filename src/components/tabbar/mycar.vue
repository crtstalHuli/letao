<template>
    <div class="car_container">
        <div v-if="hasGoods">
            <!-- 收货地址 -->
            <div v-if="list.length > 0">
                <van-divider>收货地址</van-divider>
                <van-address-list
                    v-model="chosenAddressId"
                    :list="list"
                    default-tag-text="默认"
                    @edit="onEdit"
                />
            </div>
            <div class="no_addr" v-else>
                <van-divider>收货地址</van-divider>
                <van-cell
                    title="暂无默认地址"
                    value="去设置"
                    icon="location-o"
                    to="/address"
                    is-link
                    v-if="isGoAddDefault"
                />
                <van-cell
                    title="暂无地址"
                    value="去添加"
                    icon="location-o"
                    to="/addressadd"
                    is-link
                    v-else
                />
            </div>

            <!-- 购物车 -->
            <van-divider>购买的商品</van-divider>
            <!-- 购物车列表 -->
            <div class="goods_list">
                <div
                    class="goods_item"
                    v-for="(item, index) in carList"
                    :key="item.id"
                >
                    <!-- 开关 -->
                    <!-- {{$store.getters.getGoodsSelected[item.id]}} -->
                    <van-switch
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="
                            switchChange(
                                item.id,
                                $store.getters.getGoodsSelected[item.id]
                            )
                        "
                    />
                    <!-- 商品图片 -->
                    <div class="thumbImage">
                        <img :src="item.thumb_path" alt="" />
                    </div>
                    <!-- 商品内容 -->
                    <div class="goodsInfo">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <div class="row">
                            <span class="price"
                                >&yen;{{ item.sell_price }}</span
                            >
                            <van-stepper
                                @change="
                                    stepperChaneg(
                                        item.id,
                                        $store.getters.getGoodsNumber[item.id]
                                    )
                                "
                                v-model="$store.getters.getGoodsNumber[item.id]"
                            />
                            <van-button
                                type="danger"
                                class="detel"
                                @click="del(item.id, index)"
                                >删除</van-button
                            >
                        </div>
                    </div>
                    <!--  -->
                </div>

                <!-- 微信支付 -->
                <van-cell title="微信支付" icon="gold-coin-o" />
                <!-- 提交订单 -->
                <van-submit-bar
                    :price="$store.getters.getSelectedGoodsPrice"
                    button-text="提交订单"
                    @submit="onSubmit"
                >
                    <div class="count">
                        共{{ $store.getters.getSelectedGoodsNumber }}件商品
                    </div>
                </van-submit-bar>
            </div>
        </div>

        <!-- 购物车为空 -->
        <div class="empty" v-else>
            <h3>亲，您的购物车为空，去<a href="#/home">首页</a>逛逛吧</h3>
            <div>
                <img src="@/assets/images/car.png" alt="" />
            </div>
            <div id="login" v-if="isLogin">
                <a href="#/login">登录</a>后可以同步电脑与手机购物车中的商品
            </div>
        </div>
    </div>
</template>

<script>
import {
    getShopCarsData,
    useraddress,
    getUserAddress,
    commitOrder
} from "@/api/index.js";
import {
    Switch,
    Stepper,
    Button,
    SubmitBar,
    Divider,
    AddressList,
    Cell,
    CellGroup,
    Icon,
    Dialog
} from "vant";
import { userInfo, genOrderId } from "@/util/tool.js";

export default {
    data() {
        return {
            // hasGoods:true, //判断购物车是否又数据
            isLogin: false, //时候显示前往登录
            isGoAddDefault: false, //新增地址和设置默认地址切换
            isShowAddr: true, //
            isShowStar: true,
            isShow: true,
            checked: true,
            value: 1,
            count: 0,
            carList: [],
            chosenAddressId: "1",
            list: [
                // {
                //     id: "1",
                //     name: "张三",
                //     tel: "13000000000",
                //     address:
                //         "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
                //     isDefault: true
                // }
            ]
        };
    },
    components: {
        "van-switch": Switch,
        "van-stepper": Stepper,
        "van-button": Button,
        "van-submit-bar": SubmitBar,
        "van-divider": Divider,
        "van-address-list": AddressList,
        "van-cell-group": CellGroup,
        "van-cell": Cell,
        icon: Icon
    },
    computed: {
        hasGoods() {
            // return this.carList.length > 0 && JSON.parse( localStorage.getItem('userInfo') ) != null;
            return this.carList.length > 0;
        },
        total_price: function() {
            return this.$store.getters.getSelectedGoodsPrice / 100;
        },
        number: function() {
            return this.$store.getters.getSelectedGoodsNumber;
        },
        goods_ids: function() {
            return this.$store.getters.getSelectedGoodsIds;
        }
    },
    methods: {
        async onSubmit() {
            let user = userInfo();
            // console.log(user);
            if (!user) {
                this.$router.push("/login");
            }
            if(!this.list[0]) {
                this.$toast('暂无地址，请先添加地址再下单~');
                return;
            }
            let order_id = genOrderId();
            let orderData = {
                user_id: user.id,
                order_id: order_id,
                address_id: this.list[0].id,
                total_price: this.total_price,
                number: this.number,
                goods_ids: this.goods_ids
            };
            let _this = this;
            this.$toast.loading({
                message: "支付中...",
                forbidClick: true,
                duration: 1000,
                onClose() {
                    // 询问用户是否完成支付
                    Dialog.alert({
                        message: "支付是否完成"
                    }).then(() => {
                        _this.$router.push("/myorder");
                    });
                }
            });

            let res = await commitOrder(orderData);
            var weixinpayurl = res.data;
            // console.log(res)
            location.href = weixinpayurl; //会主动唤起微信支付
            this.$store.commit("delSuccessGodds", this.goods_ids);
        },

        // 获取我的购物车商品
        async getShopCarList() {
            let ids = this.$store.getters.getAllId;
            // console.log(ids);
            if (!ids) {
                return;
            }
            let { message } = await getShopCarsData(ids);
            this.carList = message;
        },

        // 删除购物车
        del(goodsid, index) {
            this.$store.commit("delGoodsAtCat", goodsid);
            // 同时删除当前的index
            this.carList.splice(index, 1);
        },

        // 修改商品的开关状态
        switchChange(goods_id, selected) {
            // console.log(
            //     "修改开关状态的商品id：" + goods_id,
            //     "修改的状态：" + selected
            // );
            this.$store.commit("changeGoodsSelected", { goods_id, selected });
        },

        // 修改商品数量
        stepperChaneg(goods_id, number) {
            // console.log("购物车中的商品id：" + goods_id, "商品数量：" + number);
            this.$store.commit("changeGoodsNumber", { goods_id, number });
        },

        // 获取用户收货地址
        async getaddress() {
            let user_id = this.$store.state.userInfo.id;
            let userAddr = await getUserAddress(user_id);

            if (userAddr != "") {
                let index = userAddr.findIndex(item => {
                    return item.isDefault == 1;
                });
                console.log("index" + index);

                if (index > -1) {
                    let addr = userAddr[index];
                    addr.address = addr.addressDetail;
                    addr.isDefault = true;
                    this.chosenAddressId = addr.id;

                    this.list.push(addr);
                    console.log("list:" + this.list);
                    // console.log(this.chosenAddressId);
                    // console.log(addr);
                    this.isShowAddr = true;
                } else {
                    this.isShowAddr = false;
                    this.isGoAddDefault = true;
                }
            } else {
                this.isGoAddDefault = false;
            }
        },

        onEdit(item, index) {
            let userAddr = JSON.stringify(item);
            // console.log(userAddr);
            this.$router.push(`/addressedit/${userAddr}`);
        }
    },
    created() {
        this.$parent.showNavBar({ title: "我的购物车" });
        this.$parent.showFooter();

        this.getShopCarList();
        this.getaddress();

        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            this.isLogin = false;
            console.log(this.isLogin);
        } else {
            this.isLogin = true;
            console.log(this.isLogin);
        }
    }
};
</script>

<style lang="scss" scoped>
.car_container {
    // 收货地址
    .van-divider {
        margin: 2px;
        border-color: #545e6c;
        color: #545e6c;
        font-size: 16px;
    }

    .van-address-list {
        padding: 12px 12px 20px;

        // 隐藏新增地址
        .van-address-list__bottom {
            visibility: hidden;
        }
    }
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
