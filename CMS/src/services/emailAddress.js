import request from '../utils/request';

export async function emailAddress() {
    return request(
        "/gtapi/emailaddress"
    )
};

export async function emailAddressUpdate(id, params) {
    return request(
        `/gtapi/emailaddress/${id}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};

export async function emailAddressAdd(params) {
    return request(
        '/gtapi/emailaddress', {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};
