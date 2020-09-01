<template>
    <div class="newslist_container">
        <!-- <h4>{{photochildren}}</h4> -->
        <div class="newsList">
            <div
                tag="div"
                class="item"
                v-for="item in photochildren"
                :key="item.id"
            >
                <div class="img_contain">
                    <img @click='imgClick(item.id)' v-lazy="item.img_url" alt="" />
                </div>
                <div class="info">
                    <h3 class="title">{{ item.title }}</h3>
                    <div class="zhaiyao">{{ item.zhaiyao }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "common_news",
    // 子组件接收父组件数据
    props: ["photochildren"],
    methods: {
        imgClick(id) {
            // this.$toast(id)
            // 把数据传给父组件
            this.$emit("img_click", id);
        }
    }
};
</script>

<style lang="scss" scoped>
.newslist_container {
    .newsList {
        .item {
            display: flex;
            border-bottom: 1px solid #ccc;
            margin-top: 2px;

            .img_contain {
                width: 100px;
                height: 100px;

                img {
                    width: 100px;
                    height: 100%;
                }
            }

            .info {
                padding: 2px;
                width: 100%;

                .title {
                    font-size: 13px;
                    margin-bottom: 14px;

                    // 限制两行文本，超出显示省略号
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }

                .zhaiyao {
                    // 限制两行文本，超出显示省略号
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }
            }
        }
    }
}
</style>
