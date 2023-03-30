import request from '../utils/request';

export async function airdroplist() {
    return request(
        `/gtapi/airdroplist`
    )
};
