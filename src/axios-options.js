import Qs from "qs";

export default {
    headers: {},
    transformRequest: [
        function(data) {
            return Qs.stringify(data);
        }
    ],
    responseType: "json",
    withCredentials: true // 支持跨域
};
