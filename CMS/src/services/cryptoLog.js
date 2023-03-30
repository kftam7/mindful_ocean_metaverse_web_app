import request from '../utils/request';

export async function cryptoLog(login) {
    return request(
        `/gtapi/crypto/${login}`
    )
};
