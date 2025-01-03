import { useState, useEffect } from "react";
import { getClientById, updateClient } from "./manageClients";

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

      console.log('esto es client',client);
    }

    useEffect(() => {
        handleGetClientById(Number(clientId));
    }, []);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevData) => ({ ...prevData, [name]: value }));
    };

    // Guardar los cambios
    const handleSubmit = async (event) => {
      console.log(idClient)
        const rsp = await updateClient(event, client, idClient)
        if (rsp === null) {
            setIsSaving(true);
        }else{ 
            setIsSaving(false);
        }
    };

  return (
    <>
        <h1 className="form-tittle">Editar cliente</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>Nombre y apellido</label>
            <input
                type="text"
                name="fullname"
                value={client.fullname}
                onChange={handleChange}
            />

            <label>Número de contacto</label>
            <input
                type="tel"
                name="phone_number"
                value={client.phone_number}
                onChange={handleChange}/>

            <button type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar cambios"}
            </button>
        </form>
    </>
  );
};
