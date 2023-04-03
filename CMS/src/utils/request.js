import baseUrl from "./baseUrl.json";
export default function request(url, option) {
    const options = {
        ...option,
    };
    const defaultOptions = {
        "headers": {
            "content-type": "application/json",
            "accept": "application/json",
            "Authorization": "Basic bWluZGZ1bDpSVSVydTlWRA==",
        },
    };
    const newOptions = { ...defaultOptions, ...options };
    return fetch(baseUrl["baseUrl"] + url, newOptions);
};
