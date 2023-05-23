import request from '../utils/request';

export async function getArtworkList() {
    return request(
        `/mindfulapi/admin/artwork`
    )
};

export async function addArtwork(params) {
    return request(
        '/mindfulapi/admin/artwork', {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};

export async function editArtwork(versionNo, params) {
    return request(
        `/mindfulapi/admin/artwork/${versionNo}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};
