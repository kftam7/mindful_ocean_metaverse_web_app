import request from '../utils/request';

export async function getUserList() {
    return request(
        `/mindfulapi/user`
    )
};

export async function getUserDetail(appleId) {
    return request(
        `/mindfulapi/user/${appleId}`
    )
};

export async function editUser(appleId, params) {
    return request(
        `/mindfulapi/user/${appleId}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};
