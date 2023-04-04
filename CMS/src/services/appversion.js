import request from '../utils/request';

export async function getAppversionList() {
    return request(
        `/mindfulapi/appversion/all`
    )
};

export async function addAppversion(params) {
    return request(
        '/mindfulapi/appversion', {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};

export async function editAppversion(versionNo, params) {
    return request(
        `/mindfulapi/appversion/${versionNo}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};
