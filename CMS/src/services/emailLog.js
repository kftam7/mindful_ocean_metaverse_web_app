import request from '../utils/request';

export async function emailLog(login) {
    return request(
        `/gtapi/email/${login}`
    )
};
