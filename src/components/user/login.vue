<template>
    <div class="login_container">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
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
            <router-link to="/register">
                <span>新用户注册</span>
            </router-link>
        </div>
    </div>
</template>

<script>
import { Form, Field, Button,Loading  } from "vant";
import { userLogin } from '@/api/index.js';
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    components: {
        "van-form": Form,
        "van-field": Field,
        "van-button": Button
    },
    methods: {
        async onSubmit(data) {
            this.$toast.loading({
                message:'登录中',
                forbidClick:true,
                duration:0
            });
            let { message,status,token,userInfo } = await userLogin(data);
            console.log(message,status,token,userInfo);
            this.$toast.clear();
            this.$toast(message);
            if(status == '0'){
                // 登录成功，存入本地存储，跳转到首页
                localStorage.setItem('userInfo',JSON.stringify(userInfo));
                localStorage.setItem('token',token);
                this.$store.commit('addUserInfo',userInfo);
                console.log(this.$store.state.userInfo);
                this.$router.push('/home')
            }

        }
    },
    created() {
        this.$parent.showNavBar({ title: "乐淘登录注册" });
        this.$parent.showFooter();

    }
};
</script>

<style lang="scss" scoped>
.login_container {
    .text {
        text-align: center;
        font-size: 16px;
        span {
            color: #666;
        }
    }
}
</style>
