<template>
    <div class="add_address_container">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @change-area="onChangeArea"
        />
    </div>
</template>

<script>
import { addAddress, getUserAddress, editAddress } from "@/api/index.js";
import areaList from "@/util/area.js";
import { AddressEdit } from "vant";
export default {
    data() {
        return {
            areaList,
            searchResult: [],
            areaCode:''
        };
    },
    methods: {
        // 点击保存新地址
        async onSave(addressInfo) {

            addressInfo.country = addressInfo.county;
            // addressInfo.areaCode = this.areaCode;
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            var user_id = userInfo.id;

            // 新增地址设置为默认则其他地址取消默认
            // if (addressInfo.isDefault) {
            //     let addrList = await getUserAddress(user_id);
            //     addrList.map(async (item) => {
            //         if(item.isDefault){
            //             item.isDefault = false;
            //             await editAddress(item.id,item);
            //         }
            //     })
            // }

            // 新增
            let { status, message } = await addAddress(user_id, addressInfo);
            if (status == 0) {
                this.$router.push("/address");
            }
            console.log("addressAdd:"+user_id,addressInfo);
        },

        onDelete() {
            this.$toast("delete");
        },

        // 获取地区编码
        onChangeArea(values) {
            let areaArr = [];
            values.map(item => areaArr.push(item.code));
            this.areaCode = areaArr.join('-');
        }
    },
    components: {
        "van-address-edit": AddressEdit
    },
    created() {
        this.$parent.showNavBar({ title: "新增地址" });
    }
};
</script>

<style lang="scss" scoped></style>
