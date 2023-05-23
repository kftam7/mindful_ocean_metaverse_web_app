import request from '../utils/request';

export async function getEventList() {
    return request(
        `/mindfulapi/admin/event`
    )
};

export async function addEvent(params) {
    return request(
        '/mindfulapi/admin/event', {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};

export async function editEvent(versionNo, params) {
    return request(
        `/mindfulapi/admin/event/${versionNo}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};
