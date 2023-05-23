import request from '../utils/request';

export async function getUserList() {
    return request(
        `/mindfulapi/admin/user`
    )
};

export async function getUserDetail(appleId) {
    return request(
        `/mindfulapi/admin/user/${appleId}`
    )
};

export async function editUser(appleId, params) {
    return request(
        `/mindfulapi/admin/user/${appleId}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};
