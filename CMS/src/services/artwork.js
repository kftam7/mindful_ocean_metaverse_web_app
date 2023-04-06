import request from '../utils/request';

export async function getArtworkList() {
    return request(
        `/mindfulapi/artwork`
    )
};

export async function addArtwork(params) {
    return request(
        '/mindfulapi/artwork', {
            method: 'POST',
            body: JSON.stringify(params)
        }
    )
};

export async function editArtwork(versionNo, params) {
    return request(
        `/mindfulapi/artwork/${versionNo}`, {
            method: "PUT",
            body: JSON.stringify(params)
        }
    )
};
