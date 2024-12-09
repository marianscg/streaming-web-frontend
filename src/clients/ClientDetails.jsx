import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/envs";

export const ClientDetails = ({ clientId }) => {
  const [clientData, setClientData] = useState(null);
  console.log("Aquii: ", clientId);
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/users/${clientId}/services`
        );

        setClientData(response.data.data[0]);
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
      }
    };

    if (clientId) {
      fetchClientData();
    }
  }, [clientId]);

  return (
    <>
      <h2 className="secundary-tittle">Datos personales</h2>
      {clientData ? (
        <form className="register-form">
          <label>Nombre y apellido</label>
          <input type="text" value={clientData.fullname} disabled />

          <label>Número de contacto</label>
          <input type="tel" value={clientData.phoneNumber} disabled />

          <h2 className="secundary-tittle">Servicios contratados</h2>
          {clientData.services && clientData.services.length > 0 ? (
            clientData.services.map((service, index) => (
              <div key={index}>
                <label>Nombre del servicio</label>
                <input
                  type="text"
                  value={service.serviceName || "No especificado"}
                  disabled
                />

                <label>Plan contratado</label>
                <input
                  type="text"
                  value={service.servicePlanName || "No especificado"}
                  disabled
                />

                <label>Fecha de inicio</label>
                <input
                  type="date"
                  value={
                    service.createdAt
                      ? new Date(service.createdAt).toISOString().split("T")[0]
                      : ""
                  }
                  disabled
                />

                <label>Fecha de corte</label>
                <input
                  type="date"
                  value={
                    service.nextTimeToPay
                      ? new Date(service.nextTimeToPay)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  disabled
                />
              </div>
            ))
          ) : (
            <p>No hay servicios contratados</p>
          )}
        </form>
      ) : (
        <p>Cargando datos del cliente...</p>
      )}
    </>
  );
};
