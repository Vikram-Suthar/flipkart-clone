import axios from 'axios';
axios.defaults.withCredentials = true;

const URL = 'http://localhost:7000';

export const authenticateSignup = async (data) => {
    try {
        return await axios.post(`${URL}/signup`, data);
    } catch (error) {
        console.log('Error while calling signup api', error);
    }
}

export const authenticateLogin = async (data) => {
    
    try {
        return await axios.post(`${URL}/login`, data);
    } catch (error) {
        console.log('Error while calling login api', error);
        return error.response;
    }
}

export const authenticateUser = async () => {
    try {
        return await axios.get(`${URL}/user`, {
            withCredentials: true
        });
    } catch (error) {
        console.log('Error while calling authenticateUser api', error);
        return error.response;
    }
}

export const refreshUser = async () => {
    try {
        return await axios.get(`${URL}/refresh`, {
            withCredentials: true
        });
    } catch (error) {
        console.log('Error while calling refreshUser api', error);
        return error.response;
    }
}

export const logoutUserApi = async () => {
    try {
        const res = await axios.post(`${URL}/logout`, null, {
            withCredentials: true
        });
        
        if(res.status === 200){
            return res;
        }
    } catch (error) {
        console.log('Error while calling logoutUser api', error);
        return error.response;
    }
}