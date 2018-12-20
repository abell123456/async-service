# async-service

基于[axios](https://www.npmjs.com/package/axios)的异步请求统一解决方案，方便对请求配置做统一管理，使用简单高效，并支持可扩展。

### 使用示例

详细示例可见：[example](https://github.com/abell123456/async-service/tree/master/example)

```js
// service.js

export const getUserName = {
    url: "http://jsonplaceholder.typicode.com/users ",
    method: "get",
    timeout: 3000
};

```

```js
import { registerService, invokeService } from "async-service";
import * as service from "./service";

registerService(service);

(async function(args) {
    try {
        const res = await invokeService("getUserName", args);

        console.log("res:", res);
    } catch (e) {
        alert(e.message);
    }
})();

```
