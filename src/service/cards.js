import request from "../util/request";

export function getStatistic(id) {
    return request(`/api/cards/${id}/statistic`);
}