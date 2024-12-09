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

export const getClients = async () => {
    try {
      const response = await axios.get(`http://localhost:8088/api/users`); // Cambia la URL según tu API
      
      console.log(response.data.data) // Asignar los datos correctamente
      return response.data.data;
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  export const assignAccount = async (event, formData, id) => {
    console.log(formData)
    event.preventDefault();
    try {
        const response = await axios.post(`http://localhost:8088/api/users/${id}/assign-account`, formData, {
            withCredentials: true
        });
        // const { isAuthenticated, isAdmin } = response.data
        if (response.status === 201) {
            console.log('Creado correctamente', response.status);
            
        } else {
            alert('Error al asignar el plan');
        }
    } catch (error) {
        console.error('Error al asignar el plan:', error);
        alert('Error al asignarr el plan');
    }
};

export const getPlansByService = async (id) => {
    
    try {
        const response = await axios.get(`http://localhost:8088/api/services/${id}/plans/list`);
        // const { isAuthenticated, isAdmin } = response.data
        if (response.status === 200) {
            console.log('Traidos', response.status);
            console.log('esto es id', id);
            return response;
            
        } else {
            alert('Error al traer los planes');
        }
    } catch (error) {
        console.error('Error al traer los planes:', error);
        alert('Error al traer los planes');
    }
};