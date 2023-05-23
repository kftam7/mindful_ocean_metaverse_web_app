import baseUrl from "./baseUrl.json";
import {md5} from './utils'
const api_header_secret ='E6ru/w8HLusoi2IkphpP+w==';
const Current_time = Math.floor(Date.now() / 1000);
const hash = md5(api_header_secret+Current_time).toString();
export default function request(url, option) {
    const options = {
        ...option,
    };
    const defaultOptions = {
        "headers": {
            "content-type": "application/json",
            "accept": "application/json",
            "Authorization": "Basic bWluZGZ1bDpSVSVydTlWRA==",
            "time_stamp": Current_time,
            "secret": hash
        },
    };
    const newOptions = { ...defaultOptions, ...options };
    return fetch(baseUrl["baseUrl"] + url, newOptions);
};
