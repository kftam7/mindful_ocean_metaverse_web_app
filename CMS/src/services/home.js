import request from '../utils/request';

export async function crypto(login, params) {
    return request(
        `/gtapi/crypto/${login}`, {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};
