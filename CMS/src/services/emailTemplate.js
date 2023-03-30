import request from '../utils/request';

export async function emailTemplate() {
    return request(
        "/gtapi/emailtemplate"
    )
};

export async function emailTemplateUpdate(id, params) {
    return request(
        `/gtapi/emailtemplate/${id}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};

export async function emailtemplateAdd(params) {
    return request(
        `/gtapi/emailtemplate/${params.name}`, {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};
