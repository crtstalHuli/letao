<template>
    <div class="address_contianer">
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            v-if="isShow"
        />
        <div class="no_address" v-else>
            <van-empty
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="还没有收获地址哦，快去添加一个吧~"
            />
            <van-button round type="info" block color="red" @click="onAdd"
                >添加地址</van-button
            >
        </div>
    </div>
</template>

<script>
import { AddressList, Divider, Button, Empty } from "vant";
import { getUserAddress } from "@/api/index.js";
export default {
    data() {
        return {
            isShow: false,
            chosenAddressId: "1",
            list: [
                // {
                //     id: "1",
                //     name: "张三",
                //     tel: "13000000000",
                //     address:
                //         "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
                //     isDefault: true
                // },
                // {
                //     id: "2",
                //     name: "李四",
                //     tel: "1310000000",
                //     address: "浙江省杭州市拱墅区莫干山路 50 号"
                // }
            ]
        };
    },
    methods: {
        // 新增地址
        onAdd() {
            // this.$toast("新增地址");
            this.$router.push("/addressadd");
        },

        // 编辑地址
        onEdit(item, index) {
            // this.$toast("编辑地址:" + index);
            let addressInfo = JSON.stringify(item);
            this.$router.push(`/addressedit/${addressInfo}`);
        },

        // 获取当前登录用户所有收获地址
        async getAddress() {
            let _this = this;
            // let { id } = JSON.parse(localStorage.getItem("userInfo"));
            let id = this.$store.state.userInfo.id;
            let res = await getUserAddress(id);
            if (res != "") {
                let userAddrs = [];
                res.map(item => {
                    item.address = item.addressDetail;
                    if (item.isDefault == 1) {
                        item.isDefault = true;
                        _this.chosenAddressId = item.id;
                    } else {
                        delete item.isDefault;
                    }
                });
                this.list = res;
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        }
    },
    components: {
        "van-address-list": AddressList,
        "van-divider": Divider,
        "van-button": Button,
        "van-empty": Empty
    },
    created() {
        this.$parent.showNavBar({ title: "地址管理" });

        this.$parent.hideFooter();
        this.getAddress();
    }
};
</script>

<style lang="scss" scoped>
.address_contianer {
    .no_address {
        margin: auto;

        .van-divider {
            margin: 2px;
            border-color: #545e6c;
            color: #545e6c;
            font-size: 16px;
        }

        span {
            display: block;
            text-align: center;
            color: #666;
        }

        .van-button--round {
            bottom: 0;
            left: 0;
            position: absolute;
            .van-button__text {
                color: #fff;
            }
        }
    }
}
</style>
