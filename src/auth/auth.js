import axios from 'axios';
import { config } from '../config/envs';


export const handleAuth = async (event, formData, navigate) => {

    event.preventDefault();
    try {
        const response = await axios.post(`${config.apiBaseUrl}/auth/login`, formData, {
            withCredentials: true
        });
        // const { isAuthenticated, isAdmin } = response.data
        if (response.status === 201) {
             navigate('/services');
             return false
        } else if (response.status === 401){
            return true;
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return true
    }
};