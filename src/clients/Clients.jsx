import React, { useEffect, useState } from 'react'
import { NavBar } from '../navbar/NavBar'
import { useModal } from '../hooks/useModal'
import './clients.css'
import { TableOptionsModal } from './TableOptionsModal'
import { ClientRegister } from './ClientRegister'
import { ClientDetails } from './ClientDetails'
import { ClientUpdate } from './ClientUpdate'
import { ManageClientServices } from './ManageClientServices'

export const Clients = () => {
    const { isOpen, changeToOpen } = useModal();
    const [clientDetailsModal, setClientDetailsModal] = useState(false);
    const [activeOptionModal, setActiveOptionModal] = useState(null);
    const [isOptionModalOpen, setIsOptionModalOpen] = useState(null);
    const [clientsList, setClientsList] = useState();

    
    
    const handleisOptionModalOpenbyId = (clientId) => {
        setIsOptionModalOpen(clientId);
    }
    return (
      <>
          <NavBar/>
          <main className="main-content">
              <section className="section-menu">
                  <button 
                      className="register-button"
                      type="button"
                      onClick={changeToOpen}
                  >Registrar cliente</button>
                  {isOpen && 
                  <div className="overlay">
                      <div className="form-container">
                      <div className="exit-button-container">
                      <button 
                          className="exit-button"
                          type="button"
                          onClick={changeToOpen}><svg className="exit-img" width="15px" height="15px"></svg></button>
                      </div>
                      <ClientRegister/>
                      </div>
                  </div>}

                  <div className="input-search-container">
                  <svg className="icon-search" width="25px" height="25px"></svg>
                  <input
                    className="input-search"
                      name="streaming"
                      placeholder="Buscar cliente"
                      value=""
                      onChange=""/>
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
                    {/* {clientsList.map((client, index) => (
                    <tr key={index}>
                        <td>{client.name}</td>
                        <td>{client.telf}</td>
                        <td>
                        <button className="table-button" onClick={() => setClientDetailsModal(!clientDetailsModal)}>
                            <img src="/assets/eye.png" height="32px" width="32px" alt="Ver" />
                        </button>
                        {clientDetailsModal && (
                            <div className="overlay">
                                <div className="form-container">
                                    <div className="exit-button-container">
                                    <button 
                                        className="exit-button"
                                        type="button"
                                        onClick={() => setClientDetailsModal(!clientDetailsModal)}><svg className="exit-img" width="15px" height="15px"></svg></button>
                                    </div>
                                    <ClientDetails/>
                                </div>
                            </div>)}
                        </td>
                        <td>
                        <button
                            className="table-button"
                            onClick={() => handleisOptionModalOpenbyId(client.id)}>
                            <img src="/assets/more.png" height="32px" width="32px" alt="Opciones" />
                        </button>
                        {isOptionModalOpen === client.id && (
                            <TableOptionsModal 
                                onClose={() => setIsOptionModalOpen(null)}
                                onSelectOption={(option) => setActiveOptionModal(option)} />
                        )}
                        </td>
                    </tr>
                    ))} */}
                </tbody>
            </table>
            {/* {activeOptionModal === "client-update" && (
                <div className="overlay">
                <div className="form-container">
                <div className="exit-button-container">
                <button 
                    className="exit-button"
                    type="button"
                    onClick={() => setActiveOptionModal(null)}><svg className="exit-img" width="15px" height="15px"></svg></button>
                </div>
                <ClientUpdate/>
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
                    onClick={() => setActiveOptionModal(null)}><svg className="exit-img" width="15px" height="15px"></svg></button>
                </div>
                <ManageClientServices/>
                </div>
            </div>
            )} */}
            </section>
          </main>
    </>)}
