import request from '../utils/request';

export async function getEventList() {
    return request(
        `/mindfulapi/event`
    )
};

export async function addEvent(params) {
    return request(
        '/mindfulapi/event', {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};

export async function editEvent(versionNo, params) {
    return request(
        `/mindfulapi/event/${versionNo}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};
