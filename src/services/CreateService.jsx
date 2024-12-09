import { useEffect, useState } from 'react';
import { useModal } from '../hooks/useModal';
import { CreatePlans } from './CreatePlans';
import './forms.css';
import { useForm } from '../hooks/useForm';
import { handleCreateService } from './service';

export const CreateService = () => {
    const { isOpen, changeToOpen } = useModal();
    const { formData, handleChange } = useForm({
        name: "",
        max_available_profiles: "",
    });
    const [serviceId, setServiceId] = useState(null); // Estado para guardar el ID del servicio

    const updateFormData = {
        ...formData,
        max_available_profiles: Number(formData.max_available_profiles),
    };

    const handleSubmit = async (event) => {
        try {
            const createdService = await handleCreateService(event, updateFormData);
            setServiceId(createdService);
            
        } catch (error) {
            console.error("Error al crear el servicio:", error);
        }
    };

    useEffect(() => {
        if(serviceId){
            changeToOpen();
            console.log(serviceId);
        }
    }, [serviceId])

    return (
        <>
            <h1 className="form-tittle">Registrar servicio de streaming</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label>Cantidad de perfiles</label>
                <input
                    name="max_available_profiles"
                    type="number"
                    value={formData.max_available_profiles}
                    onChange={handleChange}
                />
                <button type="submit">Continuar</button>
            </form>
            {isOpen && serviceId && (
                <div className="overlay-plans">
                    <div className="form-container">
                        <div className="exit-button-container">
                            <button
                                className="exit-button"
                                type="button"
                                onClick={changeToOpen}
                            >
                                <svg className="exit-img" width="15px" height="15px"></svg>
                            </button>
                        </div>
                        <CreatePlans id={serviceId} />
                    </div>
                </div>
            )}
        </>
    );
};
