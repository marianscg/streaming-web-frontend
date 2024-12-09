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
        } else {
            alert('El usuario o la clave son incorrectos');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión');
    }
};