import axios from "axios"

// TODO: Documentation
/**
 * Gets a list of messages from a certain telegram user
 * @param {*} telegramId 
 * @param {*} messageType 
 * @param {*} isReaded 
 * @param {*} take 
 * @param {*} skip 
 * @returns 
 */
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
            // FIX: Add authorization
            Authorization: `Bearer SMTH`,
        }
    }).then(resp => resp.data);

    return response;
};

// TODO: Documentation
/**
 * Returns message' response
 * @param {*} messageId 
 * @returns 
 */
export const getMessageResponseRequest = (messageId) => {
    const response = axios.get(`${process.env.REACT_APP_API_URL}/Message/Answer/${messageId}`)
        .then(resp => resp.data);

    return response;
}

// TODO: Documentation
/**
 * Sends a message
 * @param {*} message 
 * @param {*} messageId 
 */
export const sendMessageRequest = async (message, messageId) => {
    axios.post(`${process.env.REACT_APP_API_URL}/Messages`, {message, messageId});
}
