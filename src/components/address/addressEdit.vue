<template>
    <div class="add_address_container">
        <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
             @change-area="onChangeArea"
        />
    </div>
</template>

<script>
import { editAddress, delAddress,getUserAddress } from "@/api/index.js";
import areaList from "@/util/area.js";
import { AddressEdit } from "vant";
export default {
    data() {
        return {
            areaList,
            searchResult: [],
            addressInfo: JSON.parse(this.$route.params.addressInfo) ,//数据回显
            areaCode: ''
        };
    },
    methods: {
        async onSave(addressInfo) {

            addressInfo.country = addressInfo.county;
            // addressInfo.areaCode = this.areaCode;
            console.log(addressInfo);
            let user_id = this.$store.state.userInfo.id;

            if (addressInfo.isDefault) {
                let addrList = await getUserAddress(user_id);
                addrList.map(async item => {
                    if (item.isDefault) {
                        item.isDefault = false;
                        await editAddress(item.id, item);
                    }
                });
            }
            let addressid = addressInfo.id;
            let { status, message } = await editAddress(addressid, addressInfo);
            if (status == 0) {
                this.$toast(message);
                this.$router.push("/address");
            } else {
                this.$toast(message);
            }
        },
        async onDelete(addressInfo) {

            let { status, message } = await delAddress(addressInfo.id);
            if (status == 0) {
                this.$toast(message);
                this.$router.push("/address");
            } else {
                this.$toast(message);
            }
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
        this.$parent.showNavBar({ title: "编辑地址" });
    }
};
</script>

<style lang="scss" scoped></style>
