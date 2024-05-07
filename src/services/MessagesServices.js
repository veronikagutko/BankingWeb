import axios from "axios"

export const getMessagesRequest = async (telegramId, messageType, isReaded, take, skip) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/Message`, 
    {
        params: {
            telegramId,
            messageType,
            isReaded,
            take,
            skip,
        },
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        }
    }).then(resp => resp.data);

    return response;
};

export const getMessageResponseRequest = (messageId) => {
    const response = axios.get(`${process.env.REACT_APP_API_URL}/Message/Answer/${messageId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        }
    }).then(resp => resp.data);

    return response;
}

export const sendMessageRequest = async (message, messageId) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/Message`, {message, messageId}, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
    });
}
