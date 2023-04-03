import request from '../utils/request';

export async function credential(username, password) {
    return request(
        `/mindfulapi/credential/${username}/${password}`
    )
};
