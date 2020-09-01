<template>
    <div class="photo_container">
        <van-tree-select
            @click-nav="navHandle"
            :items="items"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
        >
            <!--activeIndex当前分组的下标  -->
            <template #content>
                <!-- 子组件 -->
                <news
                    @img_click="thumb"
                    v-if="isShowNews"
                    :photochildren="items[activeIndex].children"
                ></news>
            </template>
        </van-tree-select>
    </div>
</template>

<script>
// TreeSelect:分类选择  ImagePreview :图片预览
import { TreeSelect, ImagePreview } from "vant";
import {
    getcategoryData,
    getcatelistData,
    getthumbimagesData
} from "@/api/index.js";
import news from "@/components/common/news.vue";
export default {
    data() {
        return {
            items: [
                //   {text:'分组1',children:[{text:11},{text:111},{text:111}]},
                //   {text:'分组2',children:[{text:2},{text:22},{text:333}]},
                //   {text:'分组3',children:[{text:3},{text:33},{text:333}]},
                //   {text:'分组4',children:[{text:4},{text:44},{text:444}]}
            ],
            activeId: 1,
            activeIndex: 0,
            isShowNews: false
        };
    },
    components: {
        "van-tree-select": TreeSelect,
        news,
        [ImagePreview.Component.name]: ImagePreview.Component
    },
    methods: {
        // 获取图片的所有分类
        async getPhotoCate() {
            let { message } = await getcategoryData();
            // 判断，防止没有数据报错
            if (message.length == 0) {
                return;
            }

            // 右边导航内容，最开始获取第一个分类中的数据
            let first_id = message[0].id;
            let first_children = await this.getPhotoCateList(first_id);
            message[0].children = first_children;

            // 构造左边导航栏的所需呀的属性
            message.map(v => {
                v.text = v.title;
                delete v.title;
            });
            this.items = message;

            this.isShowNews = true;
        },
        // 获取图片分享指定分类列表数据
        async getPhotoCateList(id) {
            let { message } = await getcatelistData(id);
            message.map(v => {
                v.text = v.title;
            });
            return message;
        },
        // 点击左侧获取对应的列表
        async navHandle(index) {
            // 判断当前分组的children是否有数据，有则使用之前的，不发请求重复获取,可以提高用户体验
            if (this.items[index].children) {
                return;
            }

            this.isShowNews = false;
            // 获取图片分组的id
            let id = this.items[index].id;
            let children = await this.getPhotoCateList(id);
            // console.log(children);
            this.items[index].children = children;

            this.isShowNews = true;
        },
        // 获取对应的缩略图
        async thumb(id) {
            // this.$toast('id:'+id)
            let { message } = await getthumbimagesData(id);
            if (message.length == 0) {
                this.$toast("图片制造中...");
                return;
            }
            console.log(message);

            let thumb = [];
            message.map(v =>{
                thumb.push(v.src)
            })


            ImagePreview(thumb);
        }
    },
    created() {
        this.$parent.showNavBar({ title: "美图欣赏" });
        this.$parent.hideHeader();
        this.$parent.showFooter();

        this.getPhotoCate();
    }
};
</script>

<style lang="scss" scoped>
.photo_container {
    // .van-tree-select__content {
    //     height: 90vh !important;
    // }
    .van-tree-select {
        height: 100vh !important;
    }
}
</style>
