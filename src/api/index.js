import instance from './config.js';
export async function getLunBoData(){
    return await instance.get('/getlunbo');
}

export async function getRecommendData(limit = 6){
    return await instance.get(`/recommend?limit=${limit}`);
}

export async function getNewsData(){
    return await instance.get(`/getnewslist`);
}


export async function getNewsDetailData(newid){
    return await instance.get(`/getnew/${newid}`);
}

export async function getGoodsDescData(goodsid){
    return await instance.get(`/getgoodsdesc/${goodsid}`);
}



