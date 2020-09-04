<template>
    <div class="login_container">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
        <div class="text">
            <span>新用户注册</span>
        </div>
    </div>
</template>

<script>
import { Form,Field,Button } from "vant";
export default {
    data(){
        return {
            username:'',
            password:''
        }
    },
    components: {
        "van-form": Form,
        "van-field": Field,
        "van-button": Button,
    },
    methods:{
        onSubmit(){}
    },
    created() {
        this.$parent.showNavBar({ title: "乐淘登录注册" });
        this.$parent.hideHeader();
        this.$parent.showFooter();
    }
};
</script>

<style lang="scss" scoped>
.login_container {
    .text {
        text-align: center;
        font-size: 16px;
        color: #666;
    }
}
</style>
