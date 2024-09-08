import axios from "axios";

export const getLocation = async () => {
    try {
        const { data } = await axios.get('https://iplocate.io/api/lookup');
        return data; // returns the data
    } catch (error) {
        return null; // return null or an appropriate value in case of error
    }
};