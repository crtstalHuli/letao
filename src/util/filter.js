import Vue from "vue";

// 全局过滤器
import moment from "moment";
Vue.filter("dataFormat", function(data, format = "YYYY-MM-DD") {
    return moment(data).format(format);
});
