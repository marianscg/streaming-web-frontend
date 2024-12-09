import axios from 'axios';
import { config } from '../config/envs';


export const handleCreateService = async (event, formData) => {
    event.preventDefault();
    try {
        const response = await axios.post(`${config.apiBaseUrl}/services`, formData, {
            withCredentials: true
        });
        // const { isAuthenticated, isAdmin } = response.data
        if (response.status === 201) {
             console.log(response.data.serviceId)
             return response.data.serviceId;
        } else {
            alert('El usuario o la clave son incorrectos');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión');
    }
};

export const getServices = async () => {
    try {
        const response = await axios.get(`${config.apiBaseUrl}/services`);
        if (response.status === 200) {
            const services = response.data.data;
            return services;
        }
    } catch (error) {
        console.error('Error al traer los servicios:', error);
        alert('Error al traer los servicios');
    }
};

export const getServiceById = async (id) => {
    const response = await axios.get(`http://localhost:8088/api/services/${id}/plans`); 

    const services = response.data.data
    return services;
  };

