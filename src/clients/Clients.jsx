import { useEffect, useState } from "react";
import { NavBar } from "../navbar/NavBar";
import { useModal } from "../hooks/useModal";
import "./clients.css";
import { TableOptionsModal } from "./TableOptionsModal";
import { ClientRegister } from "./ClientRegister";
import { ClientDetails } from "./ClientDetails";
import { ClientUpdate } from "./ClientUpdate";
import { ManageClientServices } from "./ManageClientServices";
import { getClients } from "./manageClients";
import { AddServiceModal } from "./AddServiceModal";

export const Clients = () => {
  const { isOpen, changeToOpen } = useModal();
  const [clientDetailsModal, setClientDetailsModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [activeOptionModal, setActiveOptionModal] = useState(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(null);
  const [clientsList, setClientsList] = useState([]); // Inicializar vacío


  const handleGetServices = async() => {
      const services = await getClients(); 
      setClientsList(services);
  }
  // Cargar los datos de los clientes
  useEffect(() => {
      handleGetServices();

  }, []);

  const handleisOptionModalOpenbyId = (clientId) => {
    setIsOptionModalOpen(clientId);
  };

  const openClientDetails = (clientId) => {
    setSelectedClientId(clientId); // Establecer el ID del cliente seleccionado
    setClientDetailsModal(true); // Abrir el modal de detalles
  };

  return (
    <>
      <NavBar />
      <main className="main-content">
        <section className="section-menu">
          <button
            className="register-button"
            type="button"
            onClick={changeToOpen}
          >
            Registrar cliente
          </button>
          {isOpen && (
            <div className="overlay">
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
                <ClientRegister />
              </div>
            </div>
          )}

          <div className="input-search-container">
            <svg className="icon-search" width="25px" height="25px"></svg>
            <input
              className="input-search"
              name="streaming"
              placeholder="Buscar cliente"
              value=""
              onChange=""
            />
          </div>
        </section>
        <h1 className="tittle">Todos los clientes</h1>
        <section className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre y apellido</th>
                <th>Contacto</th>
                <th>Detalles</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {clientsList.map((client) => (
                <tr key={client.id}>
                  <td>{client.fullname}</td>
                  <td>{client.phone_number}</td>
                  <td>
                    <button
                      className="table-button"
                      onClick={() => openClientDetails(client.id)}
                    >
                      <img
                        src="/assets/eye.png"
                        height="32px"
                        width="32px"
                        alt="Ver"
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      className="table-button"
                      onClick={() => handleisOptionModalOpenbyId(client.id)}
                    >
                      <img
                        src="/assets/more.png"
                        height="32px"
                        width="32px"
                        alt="Opciones"
                      />
                    </button>
                    {isOptionModalOpen === client.id && (
                      <TableOptionsModal
                        onClose={() => setIsOptionModalOpen(null)}
                        onSelectOption={(option) =>
                          setActiveOptionModal(option)
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal para los detalles del cliente */}
          {clientDetailsModal && selectedClientId && (
            <div className="overlay">
              <div className="form-container">
                <div className="exit-button-container">
                  <button
                    className="exit-button"
                    type="button"
                    onClick={() => setClientDetailsModal(false)}
                  >
                    <svg className="exit-img" width="15px" height="15px"></svg>
                  </button>
                </div>
                {/* Aquí se pasa el ID del cliente al componente ClientDetails */}
                <ClientDetails clientId={selectedClientId} />
              </div>
            </div>
          )}

          {/* Modales para actualizaciones y servicios */}
          {activeOptionModal === "client-update" && (
            <div className="overlay">
              <div className="form-container">
                <div className="exit-button-container">
                  <button
                    className="exit-button"
                    type="button"
                    onClick={() => setActiveOptionModal(null)}
                  >
                    <svg className="exit-img" width="15px" height="15px"></svg>
                  </button>
                </div>
                {/* Pasar el clientId al componente ClientUpdate */}
                <ClientUpdate
                  clientId={selectedClientId}
                  onUpdateSuccess={() => {
                    setActiveOptionModal(null); // Cerrar el modal
                  }}
                />
              </div>
            </div>
          )}

          {activeOptionModal === "add-service" && (
            <div className="overlay">
              <div className="form-container">
                <div className="exit-button-container">
                  <button
                    className="exit-button"
                    type="button"
                    onClick={() => setActiveOptionModal(null)}
                  >
                    <svg className="exit-img" width="15px" height="15px"></svg>
                  </button>
                </div>
                <AddServiceModal id={isOptionModalOpen} />
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
