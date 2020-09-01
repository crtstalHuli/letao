<template>
    <div class="person_contianer">
        <!-- <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" label="描述信息" />
        </van-cell-group> -->

        <van-cell value="内容" is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <img src="@/assets/images/logo.png" alt="">
            </template>
        </van-cell>

        <van-button type="default" block>退出登录</van-button>
    </div>
</template>

<script>
import { Cell, CellGroup,Button  } from "vant";
export default {
    components: {
        "van-cell-group": CellGroup,
        "van-cell": Cell,
        "van-button":Button
    },
    created() {
        this.$parent.showNavBar({ title: "个人中心" });
        this.$parent.hideHeader();
        this.$parent.hideFooter();
    }
};
</script>

<style lang="scss" scoped>
.person_contianer {
    // height: 100vh;
    position: relative;
    .van-cell {
        .van-cell__value {
            /deep/ img {
                width: 20%;
                margin-right: 100px;
            }
        }
    }

    .van-button {
        position: absolute;
        bottom: 0;
    }
}
</style>
