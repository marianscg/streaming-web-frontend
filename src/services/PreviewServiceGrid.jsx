import { useEffect, useState } from 'react';
import { useModal } from '../hooks/useModal';
import { PlanDetails } from './PlanDetails';
import { getServices } from './service';

export const PreviewServiceGrid = ({inputSearch}) => {
    const { isOpen, changeToOpen } = useModal();
    const [inputSearchValue, setInputSearchValue] = useState(inputSearch);

    const [serviceGrid, setServiceGrid] = useState([]);
    const [activeServiceId, setActiveServiceId] = useState(null); 

    const handleGridServices = async() => {
        const services = await getServices();
        setServiceGrid(services);
        console.log(serviceGrid);
    }
    
    useEffect(() => {
        handleGridServices();
    }, [])
    
    // Función para abrir el modal con el ID del servicio seleccionado
    const openModalWithService = (id) => {
        setActiveServiceId(id); // Establece el ID del servicio activo
    };

    // Cerrar el modal y restablecer el ID activo
    const closeModal = () => {
        setActiveServiceId(null);
    };
    

    const handleInputSearch = (value) => {
        console.log('esto es inputSearch en preview', value)
    }
    useEffect(() => {
        setInputSearchValue(inputSearch);
        handleInputSearch(inputSearch);
    }, [inputSearch])
    

    
   
    return (
    <>
        <section className="service-modal-grid-container">
            {Array.isArray(inputSearchValue) && inputSearchValue.length > 0 ?
            (inputSearchValue.map((serviceByname) => (
                <div key={serviceByname.id} className="service-modal-item">
                <h2>{serviceByname.name}</h2>
                <button 
                onClick={() => openModalWithService(serviceByname.id)}
                    className="button-plans"
                    type="button">
                    Ver planes
                </button>
                {activeServiceId === serviceByname.id && (
                    <div className="overlay">
                    <div className="form-plans-container">
                    <div className="exit-button-container">
                    <button 
                        className="exit-button"
                        type="button"
                        onClick={closeModal}><svg className="exit-img" width="15px" height="15px"></svg></button>
                    </div>
                        <PlanDetails id={activeServiceId}/>
                    </div>
                </div>
                )}
            </div>
            ))) :
             serviceGrid.map((service) => (
                <div key={service.id} className="service-modal-item">
                <h2>{service.name}</h2>
                <button 
                onClick={() => openModalWithService(service.id)}
                    className="button-plans"
                    type="button">
                    Ver planes
                </button>
                {activeServiceId === service.id && (
                    <div className="overlay">
                    <div className="form-plans-container">
                    <div className="exit-button-container">
                    <button 
                        className="exit-button"
                        type="button"
                        onClick={closeModal}><svg className="exit-img" width="15px" height="15px"></svg></button>
                    </div>
                        <PlanDetails id={activeServiceId}/>
                    </div>
                </div>
                )}
            </div>
            ))
            }
        </section>
    </>)}
