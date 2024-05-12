import axios from "axios"

export const getActivityRequest = async (take, skip, telegramId) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/Activity`, {
        params: {
            take,
            skip,
            telegramId,
        }
    }).then(resp => resp.data);

    return response;
}

export const getStatisticsRequest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/Activity/Stat`)
        .then(resp => resp.data.sort((a, b) => b.percent - a.percent));

    return response;
}