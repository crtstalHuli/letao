<template>
    <div class="person_contianer">
        <van-cell-group>
            <van-cell>
                <template #title>
                    <img src="../../assets/images/logo.png" alt="" />
                    <div class="username">用户名:{{$store.state.userInfo.username}}</div>
                </template>
            </van-cell>
            <van-cell title="修改密码" is-link />
            <van-cell title="我的订单" is-link to="/myorder" />
            <van-cell title="地址管理" is-link to='/address' />
        </van-cell-group>
        <br />
        <van-cell title="提交反馈" is-link />
        <van-cell title="关于乐淘" value="v1.0.0" />
        <van-cell>
            <template #title>
                <a href="#">weixin h5 pay</a>
            </template>
        </van-cell>
        <van-button type="default" block @click="aresure">退出登录</van-button>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Cell, CellGroup, Button, Dialog } from "vant";
import { isLogin } from '@/api/index.js';
export default {
    components: {
        "van-cell-group": CellGroup,
        "van-cell": Cell,
        "van-button": Button,
        [Dialog.Component.name]: Dialog.Component
    },
    computed: {
        getUsername:function(){
           let {username} = JSON.parse( localStorage.getItem('userInfo'));
           return username;
        }
    },
    methods: {
        aresure() {
            Dialog.confirm({
                title: "确认退出登录？",
                message: "",
                confirmButtonColor:"#1989fa",

            })
                .then(() => {
                    // on confirm
                    // 点击确认退出，同时删除本地存储，返回登录页面
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');
                    this.$router.push('/login')
                })
                .catch(() => {
                    // on cancel

                });
        }
    },
    created() {
        this.$parent.showNavBar({ title: "个人中心" });
        // this.$parent.hideHeader();
        this.$parent.hideFooter();
        isLogin();
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
        left: 0;
    }

}
</style>
