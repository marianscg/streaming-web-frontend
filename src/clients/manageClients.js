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
             return response.data.clientId;
        } else {
            alert('Error al registar el cliente');
        }
    } catch (error) {
        if (error.response.status === 404){
            alert('Este usuario ya se encuentra registrado');
        } else 
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
    console.log('esto es id', id)
    event.preventDefault();
    try {
        const response = await axios.post(`http://localhost:8088/api/users/${id}/assign-account`, {services: formData}, {
            withCredentials: true
        });
        // const { isAuthenticated, isAdmin } = response.data
        if (response.status === 201) {
            alert('Servicios asignados correctamente')
            console.log('Servicios asignados correctamente', response.status);
            // window.location.reload();
            
        } else {
            alert('Error al asignar servicios al cliente');
        }
    } catch (error) {
        console.error('Error al asignar servicios al cliente:', error);
        alert('Error al asignar servicios al cliente');
    }
};

export const getPlansByService = async (id) => {
    
    try {
        const response = await axios.get(`http://localhost:8088/api/services/${id}/plans/list`);
        // const { isAuthenticated, isAdmin } = response.data
        if (response.status === 200) {
            console.log('Traidos', response.status);
            // console.log(response.data)
            return response.data;
            
        } else {
            alert('Error al traer los planes');
        }
    } catch (error) {
        console.error('Error al traer los planes:', error);
        alert('Error al traer los planes');
    }
};

export const getClientById = async (id) => {
    console.log('esto es id dentro: ', id)
    try {
        const response = await axios.get(`http://localhost:8088/api/users/${id}`);

        if (response.status === 200) {

            const { data } = response.data;
            const clients = data;
            return clients;
        }

    } catch (error) {
        console.error('Error al traer los datos del cliente: ', error);
    }
};

export const updateClient = async(event, formData, id) => {
    event.preventDefault();
    console.log('esto es client dentro', formData)
      try {
        const response = await axios.patch(`${config.apiBaseUrl}/users/${id}/edit`, formData);
        if(response.status === 200)
        alert("Cliente actualizado exitosamente.");
        window.location.reload();
        // onUpdateSuccess(); // Notificar al componente padre
      } catch (error) {
        console.error("Error updating client:", error);
        alert("Hubo un error al actualizar el cliente.");
      }

}

export const getClientByName = async(value) => {
    try {
        const response = await axios.get(`http://localhost:8088/api/users/find?name=${value}`);

        if (response.status === 200) {
            console.log('Traidos', response.status);
            // console.log(response.data)
            return response.data.data;
            
        } else {
            alert('Error al buscar el cliente');
        }

    } catch (error) {
        console.error('Error al buscar el cliente: ', error);
    }
}

export const getAccountsByIdService = async (id) => {
    console.log('esto es id dentro: ', id)
    try {
        const response = await axios.get(`http://localhost:8088/api/accounts/${id}/plans`);

        if (response.status === 200) {

            const { data } = response.data;
            const accounts = data.flatMap(item => 
                item.accounts.map(account => ({
                    email: account.email,
                    id: account.id
                }))
            )
            return accounts;
        }

    } catch (error) {
        console.error('Error al traer los correos disponibles: ', error);
    }
};



