import axios from "axios";


export const createPlan = async (event, formData, id) => {
    console.log(formData)
    event.preventDefault();
    try {
        const response = await axios.post(`http://localhost:8088/api/services/${id}/plans`, formData, {
            withCredentials: true
        });
        // const { isAuthenticated, isAdmin } = response.data
        if (response.status === 201) {
            console.log('Creado correctamente', response.status);
        } else {
            alert('Error al añadir el plan');
        }
    } catch (error) {
        console.error('Error al añadir el plan:', error);
        alert('Error al añadir el plan');
    }
};