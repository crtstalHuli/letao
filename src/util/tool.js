import { min } from "moment";

// 延长loding
export function sleep(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },time)
    })
}



// 判断用户是否登录
export function userInfo(){
    let user;
    try {
        user = JSON.parse( localStorage.getItem('userInfo') );
    } catch (error) {
        return false;
    }

    let token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    return user;
}


// 生成订单号
export function genOrderId(){
    var randomNumber = "";
    for (let i = 0; i < 6; i++) {
        randomNumber += Math.floor( Math.random()*10 );
    }
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    // 补0操作
    const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0'+n;
    }

    return [year,month,day,hour,minute,second].map(formatNumber).join('')+randomNumber;
}
