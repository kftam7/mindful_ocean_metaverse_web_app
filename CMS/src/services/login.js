import request from '../utils/request';

export async function credential(params) {
    return request(
        `/mindfulapi/credential/${params}`
    )
};
