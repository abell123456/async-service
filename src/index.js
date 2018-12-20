import axios from "axios";
import options from "./axios-options";

const GLOBAL_NAMESPACE = "$$global";

export const axiosIns = axios.create(options);

export const serviceStore = {};

// 注册服务
export function registerService(namespace, ...args) {
    let services = [];
    if (!isStr(namespace)) {
        services = [namespace];
        namespace = GLOBAL_NAMESPACE;
    }
    services = services.concat(args);

    serviceStore[namespace] = serviceStore[namespace] || {};

    services.forEach(serviceSet => {
        Object.keys(serviceSet).forEach(serviceName => {
            // eslint-disable-next-line
            if (serviceStore[namespace][serviceName])
                return console.warn(
                    `Service '${namespace}/${serviceName}' has been registered.`
                );
            const options = serviceSet[serviceName];
            serviceStore[namespace][serviceName] = options;
        });
    });
}

function defaultDataHandler(data, others) {
    if (!data || !others) {
        return data;
    }

    if (isStr(data) || isStr(others)) {
        return others;
    }

    return {
        ...data,
        ...others
    };
}

export const invokeService = function(name, otherData) {
    let [namespace, serviceName] = name.split("/");
    if (!serviceName) {
        serviceName = namespace;
        namespace = GLOBAL_NAMESPACE;
    }

    const requestOption =
        serviceStore[namespace] && serviceStore[namespace][serviceName];

    // eslint-disable-next-line
    if (requestOption == null)
        return console.warn(
            `Do not find service '${namespace}/${serviceName}'.`
        );

    const {
        dataHandler = defaultDataHandler,
        url: originUrl,
        data = {},
        method,
        noSchema = false,
        ...others
    } = requestOption;

    if (!originUrl) {
        throw new Error(`Service '${name}' has an invalid empty url`);
    }

    let finalData = {};
    if (isFunc(dataHandler)) {
        finalData = dataHandler(data, otherData);
    }

    const url = originUrl.replace(
        /\{\{(.+?)\}\}/g,
        (m, $1) => finalData[$1] || ""
    );

    return axiosIns.request({ url, ...others, data: finalData, method });
};

// ******* helpers ******
function isFunc(func) {
    return typeof func === "function";
}

function isStr(str) {
    return typeof str === "string";
}
