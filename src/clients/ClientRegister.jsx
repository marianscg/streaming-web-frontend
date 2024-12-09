import { useModal } from "../hooks/useModal";
import { AddServiceModal } from "./AddServiceModal";
import { useForm } from '../hooks/useForm';
import { clientRegister } from './manageClients.js';
import { useEffect, useState } from "react";
export const ClientRegister = () => {
    
    const { isOpen, changeToOpen } = useModal();
    const { formData, handleChange } = useForm({
        fullname: "",
        phone_number: "",
    });
    const [clientId, setClientId] = useState(null); // Estado para guardar el ID del cliente

    const handleSubmit = async (event) => {
        try {
            const createdClient = await clientRegister(event, formData);
            setClientId(createdClient);
            
        } catch (error) {
            console.error("Error al crear el servicio:", error);
        }
    };

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
            <input
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}/>
            <label>Número de contacto</label>
            <input
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}/>
            <button
                type="button"
                onClick={changeToOpen}>Continuar</button>
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
