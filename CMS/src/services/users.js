import request from '../utils/request';

export async function getTableList() {
    return request(
        `/gtapi/credential`
    )
};

export async function getEmailTemplatesApi(credentialID) {
    return request(
        `/gtapi/emailtemplatelookup/${credentialID}`
    )
};

export async function getEmailtemplate() {
    return request(
        `/gtapi/emailtemplate`
    )
};

export async function getUserDetail(name) {
    return request(
        `/gtapi/credential/${name}`
    )
};

export async function addCredential(params) {
    return request(
        `/gtapi/credential/${params.name}`, {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};

export async function editCredential(id, params) {
    return request(
        `/gtapi/credential/${params.name}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};

export async function editEmailtemplatelookup(id, params) {
    return request(
        `/gtapi/emailtemplatelookup/${id}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};