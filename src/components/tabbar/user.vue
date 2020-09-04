<template>
    <div class="person_contianer">
        <van-cell-group>
            <van-cell>
                <template #title>
                    <img src="../../assets/images/logo.png" alt="" />
                    <div class="username">用户名:huli</div>
                </template>
            </van-cell>
            <van-cell title="修改密码" is-link />
            <van-cell title="我的订单" is-link />
            <van-cell title="地v1.0.0址管理" is-link />
        </van-cell-group>
        <br />
        <van-cell title="提交反馈" is-link />
        <van-cell title="关于乐淘" value="v1.0.0" />
        <van-cell>
            <template #title>
                <a href="#">weixin h5 pay</a>
            </template>
        </van-cell>
        <van-button type="default" block>退出登录</van-button>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Cell, CellGroup, Button } from "vant";
export default {
    components: {
        "van-cell-group": CellGroup,
        "van-cell": Cell,
        "van-button": Button,
        isShow: false
    },
    computed: {},
    methods: {},
    created() {
        this.$parent.showNavBar({ title: "个人中心" });
        this.$parent.hideHeader();
        this.$parent.hideFooter();
    }
};
</script>

<style lang="scss" scoped>
.person_contianer {
    .van-cell-group {
        .van-cell {
            .van-cell__title {
                display: flex;
                align-items: center;

                img {
                    width: 20%;
                    margin-right: 100px;
                }

                .username {
                    font-size: 18px;
                    color: #5d5555;
                }

                span {
                    font-size: 14px;
                }
            }
        }
    }
    .van-button {
        position: fixed;
        bottom: 0;
        left: 0 ;
    }
}
</style>
