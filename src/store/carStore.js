import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 购物车商品对象：{id,number,price,title,select:true}

// 取出本地存储中购物车商品，放到全局共享state中
var carDatas = JSON.parse(localStorage.getItem("carData") || "[]");
const store = new Vuex.Store({
    state: {
        carData: carDatas
    },
    mutations: {
        // 商品加入购物车
        addCar(state, goods) {

            var index = state.carData.findIndex( v =>v.id == goods.id)
            if(index !== -1){
                state.carData[index].number += goods.number;
            }else {
                state.carData.push(goods);
            }

            localStorage.setItem('carData',JSON.stringify(state.carData));


            // var index;
            // var hasSomeGoods = state.carData.some((item, k) => {
            //     index = k;
            //     return item.id === goods.id;
            // });

            // if (hasSomeGoods) {
            //     state.carData[index].number += goods.number;
            // } else {
            //     state.carData.push(goods);
            // }

            // localStorage.setItem("carData", JSON.stringify(state.carData));
        },

        // 删除购物车
        delGoodsAtCat(state,goods_id){
            let index = state.carData.findIndex(item =>item.id === goods_id);
            console.log("删除购物车的下标："+index);
            state.carData.splice(index,1);
             //同步到本地存储
             localStorage.setItem("carData", JSON.stringify(state.carData));
        },

        // 修改商品的开关状态
        changeGoodsSelected(state,obj){
            let index = state.carData.findIndex( item =>{
                return item.id == obj.goods_id;
            })
            state.carData[index].selected = obj.selected;
            //同步到本地存储
            localStorage.setItem("carData", JSON.stringify(state.carData));
        },

        // 修改商品的数量
        changeGoodsNumber(state,obj){
            let index = state.carData.findIndex( item =>{
                return item.id == obj.goods_id;
            })
            state.carData[index].number = obj.number;
            // 同步到本地存储
            localStorage.setItem('carData',JSON.stringify(state.carData))
        }
    },
    getters: {
        // 购物车商品总数量
        getTotalNum(state) {
            let total = 0;
            state.carData.map(v => {
                total += v.number;
            });
            return total;
        },

        // 购物车商品所有id
        getAllId(state) {
            let allId = [];
            state.carData.map(v => {
                allId.push(v.id);
            });
            return allId.join(",");
        },

        // 获取选中的商品数量
        getSelectedGoodsNumber(state){
            let total = 0;
            state.carData.map(item =>{
                if(item.selected === true){
                    total += item.number
                }
            })
            return total;
        },

        // 获取选中商品的总价格
        getSelectedGoodsPrice(state){
            let totalPrice = 0;
            state.carData.map( item =>{
                if(item.selected === true){
                    totalPrice += item.number * item.price
                }
            })
            return totalPrice*100;
        },

        // 获取购物车商品的购买数量 构造数据如下
        // {商品id:商品number，商品id:商品number}
        getGoodsNumber(state){
            let obj ={};
            state.carData.map( item =>{
                obj[item.id] = item.number;
            })
            console.log("购物车中的商品数量："+obj);
            return obj;
        },

         // 获取购物车商品的开关状态 构造数据如下
        // {商品id:true，商品id:false}
        getGoodsSelected(state){
            let obj = {};
            state.carData.map( item => {
                obj[item.id] = item.selected;
            })
            // console.log("获取商品的开关状态"+obj);
            return obj;
        },

    },
    actions: {}
});

export default store;

// 1.点击加入购物车：获取number,判断里面是否有数据