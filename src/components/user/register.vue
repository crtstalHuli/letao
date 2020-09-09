<template>
    <div class="register_container">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '密码' }]"
            />
            <van-field
                v-model="repassword"
                type="password"
                name="repassword"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
        <div class="text">
            <router-link to="/login">
                <span>登录</span>
            </router-link>
        </div>
    </div>
</template>

<script>
import { Form, Field, Button } from "vant";
import { userRegister } from '@/api/index.js';
export default {
    data() {
        return {
            username: "",
            password: "",
            repassword:""
        };
    },
    components: {
        "van-form": Form,
        "van-field": Field,
        "van-button": Button
    },
    methods: {
        async onSubmit(data) {
            // console.log(data);
            let {password,repassword} = data;
            if(password != repassword){
                this.$toast('密码不一致，请重新确认');
                this.username = '';
                this.password = '';
                this.repassword = '';
                return;
            }

            let {status,message} = await userRegister(data);
            if(status == 0){
                this.$toast(message+",前往登录");
                this.$router.push('/login');

            }else {
                this.$toast(message);
            }
            // console.log(res);

        }
    },
    created() {
        this.$parent.showNavBar({ title: "乐淘登录注册" });
        this.$parent.showFooter();
        // this.$parent.hideHeader();
    }
};
</script>

<style lang="scss" scoped>
.register_container {
    .text {
        text-align: center;
        font-size: 16px;

        span {
            color: #666;
        }
    }
}
</style>
