import { useState, useEffect } from "react";
import { getClientById, updateClient } from "./manageClients";
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


export const ClientUpdate = ({ clientId, onUpdateSuccess }) => {
    const [idClient, setIdClient] = useState(clientId);
    const [client, setClient] = useState({
        fullname: "",
        phone_number: "",
    });

    const [isSaving, setIsSaving] = useState(false);

    // Cargar datos del cliente
    const handleGetClientById = async(id) => {
        const rsp = await getClientById(id);
        setClient(rsp);
    }

    useEffect(() => {
        handleGetClientById(Number(clientId));
    }, []);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevData) => ({ ...prevData, [name]: value }));
    };

    const [isSubmitted, setIsSubmitted] = useState(false); //Controla si se ha realizado el evento en handleSubmit
    const [isFormValid, setIsFormValid] = useState(true); //isFormValid controla hacer la peticion a la API solo si no hay errores
    
    //Validaciones
    const { errors, handleValidations } = useValidate(
        formDataValidation,
        client
    );
    //Funcion para manejar el estado de isFormValid
    const handleIsFormValid = async() => {
        const isValid = await handleValidations()
            setIsFormValid(isValid)
            // console.log(isFormValid)
    }    

    useEffect(() => {
        if (isSubmitted) handleIsFormValid();
      }, [isSubmitted, handleValidations]);
    
      
    // Guardar los cambios
    const handleSubmit = async (event) => {
        setIsSubmitted(true);
        if(isFormValid){
        const rsp = await updateClient(event, client, idClient)
        if (rsp === null) {
                setIsSaving(true);
        }else{ 
                setIsSaving(false);
            }}
    };

  return (
  <>
      <h1 className="form-tittle">Editar cliente</h1>
          <form className="register-form" onSubmit={handleSubmit}>
              <label>Nombre y apellido</label>
              {errors.fullname && <p className="error-text">{errors.fullname}</p>}
              <input
                  type="text"
                  name="fullname"
                  value={client.fullname}
                  onChange={handleChange}
              />
              <label>Número de contacto</label>
              {errors.phone_number && <p className="error-text">{errors.phone_number}</p>}
              <input
                  type="tel"
                  name="phone_number"
                  value={client.phone_number}
                  onChange={handleChange}/>

              <button type="submit" disabled={isSaving}>
                  {isSaving ? "Guardando..." : "Guardar cambios"}
              </button>
          </form>
  </>)};
