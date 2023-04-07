import request from '../utils/request';

export async function getlanguageList() {
    return request(
        `/mindfulapi/language`
    )
};

export async function editlanguage(language, params) {
    return request(
        `/mindfulapi/language/${language}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};
