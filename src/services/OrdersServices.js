import axios from "axios"

export const getOrdersRequest = async (take, skip) => {
    const orders = await axios.get(`${process.env.REACT_APP_API_URL}/Order`, {
        params: {
            take, 
            skip
        },
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
    }).then(resp => resp.data);

    return orders;
}


export const setOrderCompleteRequest = async (id) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/Order`, id, {
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
    });
}