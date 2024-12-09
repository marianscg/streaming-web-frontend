import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../config/envs";

export const ClientUpdate = ({ clientId, onUpdateSuccess }) => {
  const [clientData, setClientData] = useState({
    fullname: "",
    phoneNumber: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Cargar datos del cliente al montar el componente
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/users/${clientId}`
        );
        const { fullname, phone_number: phoneNumber } = response.data.data;
        setClientData({ fullname, phoneNumber });
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClientData();
  }, [clientId]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Guardar los cambios
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.patch(`${config.apiBaseUrl}/users/${clientId}/edit`, {
        fullname: clientData.fullname,
        phone_number: clientData.phoneNumber,
      });
      alert("Cliente actualizado exitosamente.");
      onUpdateSuccess(); // Notificar al componente padre
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Hubo un error al actualizar el cliente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <h1 className="form-tittle">Editar cliente</h1>
      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <label>Nombre y apellido</label>
        <input
          type="text"
          name="fullname"
          value={clientData.fullname}
          onChange={handleChange}
          disabled={isSaving}
        />

        <label>Número de contacto</label>
        <input
          type="tel"
          name="phoneNumber"
          value={clientData.phoneNumber}
          onChange={handleChange}
          disabled={isSaving}
        />

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </>
  );
};
