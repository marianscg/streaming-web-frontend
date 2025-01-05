import { useEffect, useState } from 'react';
import { useModal } from '../hooks/useModal';
import { CreatePlans } from './CreatePlans';
import './forms.css';
import { useForm } from '../hooks/useForm';
import { handleCreateService } from './service';
import * as Yup from 'yup';
import { useValidate } from "../hooks/useValidate.js";

const formDataValidation = Yup.object({
    name: Yup.string().
    required('Este campo es requerido').
    min(1, 'El nombre del servicio es requerido').
    max(10, "El nombre del servicio no puede tener más de 10 caracteres"),
    max_available_profiles: Yup.number().
    typeError('Este campo es requerido').
    integer('El numero de pantallas debe ser un entero').
    positive('El numero de pantallas no puede ser negativo'),
});

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
    
    const [isSubmitted, setIsSubmitted] = useState(false); //Controla si se ha realizado el evento en handleSubmit
    const [isFormValid, setIsFormValid] = useState(true); //isFormValid controla hacer la peticion a la API solo si no hay errores
        
    //Validaciones
    const { errors, handleValidations } = useValidate(
        formDataValidation,
        formData
    );
    //Funcion para manejar el estado de isFormValid
    const handleIsFormValid = async() => {
        const isValid = await handleValidations()
            setIsFormValid(isValid)
            // console.log(isFormValid)
    }    
    
    const handleSubmit = async (event) => {
        setIsSubmitted(true);
        if(isFormValid){
            const createdService = await handleCreateService(event, updateFormData);
            setServiceId(createdService);
        } 
    };

    useEffect(() => {
        if (isSubmitted) handleIsFormValid();
    }, [isSubmitted, handleValidations]);


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
                {errors.name && <p className="error-text">{errors.name}</p>}
                <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label>Cantidad de perfiles</label>
                {errors.max_available_profiles && <p className="error-text">{errors.max_available_profiles}</p>}
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
