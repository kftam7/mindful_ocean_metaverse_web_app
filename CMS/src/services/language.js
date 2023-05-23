import request from '../utils/request';

export async function getlanguageList() {
    return request(
        `/mindfulapi/admin/language`
    )
};

export async function editlanguage(language, params) {
    return request(
        `/mindfulapi/admin/language/${language}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};
