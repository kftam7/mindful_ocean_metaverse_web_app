import request from '../utils/request';

export async function credential(params) {
    return request(
        `/gtapi/credential/${params}`
    )
};
