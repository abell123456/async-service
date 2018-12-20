import { registerService, invokeService } from "../lib";
import * as service from "./service";

registerService(service);

export default {
    name: "home",

    data: {
        name: "请求中......"
    },

    effects: {
        async getName(args) {
            try {
                const res = await invokeService("getUserName", args);

                console.log("res:", res);

                if (
                    res.status === 200 &&
                    Array.isArray(res.data) &&
                    res.data.length
                ) {
                    this.set({ name: res.data[0].name });
                } else {
                    this.set({ name: "请求失败" });
                }
            } catch (e) {
                alert(e.message);
            }
        }
    }
};
