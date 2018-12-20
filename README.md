# async-service

### 使用示例

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
