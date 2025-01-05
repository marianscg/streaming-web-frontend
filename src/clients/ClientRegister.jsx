import { useModal } from "../hooks/useModal";
import { AddServiceModal } from "./AddServiceModal";
import { useForm } from '../hooks/useForm';
import { clientRegister } from './manageClients.js';
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useValidate } from "../hooks/useValidate.js";
const formDataValidation = Yup.object({

    fullname: Yup.string().
    required("El nombre y apellido del cliente es requerido").
    matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, "Solo se permiten letras y espacios").
    min(1, "El nombre y apellido del cliente es requerido").
    max(20, "Este campo no puede contener más de 20 caracteres"),
    
    phone_number: Yup.string()
    .matches(/^04(14|12|24|16|26)-?\d{7}$/, "El formato del teléfono no es válido")
    .required("Debes ingresar el número de teléfono"),
  });

export const ClientRegister = () => {
    
    const { isOpen, changeToOpen } = useModal();
    const { formData, handleChange } = useForm({
        fullname: "",
        phone_number: "",
    });
    const [clientId, setClientId] = useState(null); // Estado para guardar el ID del cliente y enviarlo a AddServiceModal
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
            const createdClient = await clientRegister(event, formData);
            setClientId(createdClient);
        }
    }

    useEffect(() => {
        if (isSubmitted) handleIsFormValid();
      }, [isSubmitted, handleValidations]);

    //useEffect para controlar el estado de clientId y abrir el siguiente modal
    useEffect(() => {
        if(clientId){
            changeToOpen();
            console.log(clientId);
        }
    }, [clientId])
    return (
    <>
       <h1 className="form-tittle">Registrar cliente</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>Nombre y apellido</label>
            {errors.fullname && <p className="error-text">{errors.fullname}</p>}
            <input
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}/>
            <label>Número de contacto</label>
            {errors.phone_number && <p className="error-text">{errors.phone_number}</p>}
            <input
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}/>
            <button
                type="submit">Continuar</button>
            {isOpen && clientId &&
            <div className="overlay-plans">
                <div className="form-container">
                    <div className="exit-button-container">
                        <button 
                            className="exit-button"
                            type="button"
                            onClick={changeToOpen}><svg className="exit-img" width="15px" height="15px"></svg></button>
                    </div>
                    <AddServiceModal id={clientId}/>
                </div>
            </div>}
        </form>
    </>    
    )}
