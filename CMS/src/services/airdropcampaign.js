import request from '../utils/request';

export async function airdropcampaign() {
    return request(
        `/gtapi/airdropcampaign`
    )
};
