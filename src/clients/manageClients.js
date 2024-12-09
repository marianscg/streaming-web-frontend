import axios from 'axios';
import { config } from '../config/envs';


export const clientRegister = async (event, formData) => {
    event.preventDefault();
    try {
        const response = await axios.post(`${config.apiBaseUrl}/users`, formData, {
            withCredentials: true
        });
        // const { isAuthenticated, isAdmin } = response.data
        if (response.status === 201) {
             console.log(response.data.clientId)
             return response.data.clientId;
        } else {
            alert('Error al registrar el cliente');
        }
    } catch (error) {
        console.error('Error al registrar el cliente:', error);
        alert('Error al registrar el cliente');
    }
};