import instance from "./config.js";
// 轮播图
export async function getLunBoData() {
    return await instance.get("/getlunbo");
}

//首页推荐商品
export async function getRecommendData(limit = 6) {
    return await instance.get(`/recommend?limit=${limit}`);
}

// 商品列表
// 获取商品列表数 getgoods?pageindex=2
export  async  function getGoodsListData(page){
    return  await instance.get(`/getgoods?pageindex=${page}`);
}

// 商品图文介绍
export async function getGoodsDescData(goodsid) {
    return await instance.get(`/getgoodsdesc/${goodsid}`);
}

// 商品详情轮播图 /getthgetumbimages/90
export async function getthgetumbimages(goodsid) {
    return await instance.get(`/getthumbimages/${goodsid}`);
}

// 商品参数区和价格，标题等数据 getgoodsinfo/95
export async function getgoodsinfo(goodsid) {
    return await instance.get(`/getgoodsinfo/${goodsid}`);
}

// 新闻列表
export async function getNewsData(page = 1, pagesize = 5) {
    return await instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}

// 新闻详情
export async function getNewsDetailData(newid) {
    return await instance.get(`/getnew/${newid}`);
}

// 评论详情
export async function getcommentsData(artid, pageindex = 1) {
    return await instance.get(`/getcomments/${artid}?pageindex=${pageindex}`);
}

// 添加新闻评论
export function addNewsComment(artid, content) {
    return instance.post(`/postcomment/${artid}`,content);
}

// 获取图片的所有分类 /getcategory
export async function getcategoryData() {
    return await instance.get(`/getcategory`);
}

// 获取图片分享指定分类列表数据 getcatelist/:id
export async function getcatelistData(id) {
    return await instance.get(`/getcatelist/${id}`);
}

// 图片分享-获取图片详情中的缩略图 getthumbimages/:id
export async function getthumbimagesData(id) {
    return await instance.get(`/getthumbimages/${id}`);
}

// 获取购物车数据 {{$store.getters.getAllId}}
export async function getShopCarsData(carIds) {
    return await instance.get(`/getshopcarlist/${carIds}`);
}

// 登录
export async function userLogin(data){
    return await instance.post(`/login`,data);
}

// 验证token
export async function isLogin(){
    let token = localStorage.getItem('token');
    try{
        await instance.post(`/checktoken?token=${token}`);
    }catch(e){}
}

// 注册
export async function userRegister(data){
    return await instance.post(`/register`,data);
}


// 获取用户的收获地址
export async function getUserAddress(userid){
    return await instance.get(`/getaddress/${userid}`);
}

// 新增地址
export async function addAddress(userid,addressInfo){
    return await instance.post(`/addaddress/${userid}`,addressInfo);
}

// 用户编辑收货地址 /updateaddress/:address_id
export async function editAddress(address_id,addressInfo){
    return await instance.post(`/updateaddress/${address_id}`,addressInfo);
}


// 删除用户的收货地址 /deladdress/:address_id
export async function delAddress(address_id){
    return await instance.post(`/deladdress/${address_id}`);
}

// 提交订单 /commitorder
export async function commitOrder(orderData){
    return await instance.post(`/commitorder`,orderData);
}

// 获取订单 /userorder/:user_id
export async function getUserOrder(user_id){
    return await instance.post(`/userorder/${user_id}`);
}
