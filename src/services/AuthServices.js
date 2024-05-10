import axios from "axios"

export const authorizeRequest = async (name, password) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/Auth`, 
        {
            name, 
            password
        })
        .then(resp => resp.data);

    return response;
}