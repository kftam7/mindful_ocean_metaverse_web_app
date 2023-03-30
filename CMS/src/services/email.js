import request from '../utils/request';

export async function email(login, params) {
    return request(
        `/gtapi/email/${login}`, {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};

export async function getUseremailtemplate(credentialID, chain) {
    return request(
        `/gtapi/useremailtemplate/${credentialID}/${chain}`
    )
};

export async function sendEmail(params, dataFile) {
    return request(
        `/gtapi/email/${params.admin}/${params.templateID}/${params.chain}/${params.tokenAddress}/${params.ifKYC}/${params.expire}`, {
            method: 'POST',
            body: JSON.stringify(dataFile)
        }
    )
};