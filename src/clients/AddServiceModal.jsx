import { useEffect, useState } from 'react'
import { getServices } from '../services/service'
import { getPlansByService } from './manageClients'

export const AddServiceModal = ({id}) => {
    const [serviceList, setServiceList] = useState([{
        service_plans_id: "",
        account_id: "",
        profile_pin: "",
        profile_name: ""
    }])

    const handleServicesList = () => {
            setServiceList([...serviceList, {
                service_plans_id: "",
                account_id: "",
                profile_pin: "",
                profile_name: ""
            }])
        }
        
    const handleServiceRemoveButton = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    }
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const handleServiceChange = (index, event) => {
        const { name, value } = event.target;
        const updatedService = [...serviceList];
    
        // Convierte a número si el campo debe contener un número
        updatedService[index][name] =
            name === "service_plans_id" || name === "account_id" || name === "profile_pin"
                ? Number(value)
                : value;
            if(name === "service_id") 
                setSelectedServiceId(value);
            
        setServiceList(updatedService);
    };

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        
        await assignAccount(event, serviceList, id);
        
    };

    const [plansList, setPlansList] = useState([]);

    const handleGetPlansByService = async(idService) => {
        const rsp = await getPlansByService(idService);
        setPlansList(rsp);
        console.log(plansList);
    }
    


    const [services, setServices] = useState([]);

    const handleSelectServices = async() => {
        const rsp = await getServices();
        setServices(rsp);
        console.log(rsp);
    }
    
    useEffect(() => {
        handleSelectServices();
    }, [])

    useEffect(() => {
        if(selectedServiceId)
        handleGetPlansByService(selectedServiceId);
    }, [selectedServiceId])
    return (
    <>
        <h1 className="form-tittle">Añadir servicios</h1>
        <form className="register-form">
            {serviceList.length >= 1 && serviceList.length < 5 && (
                <button 
                onClick={handleServicesList}
                type="button"
                className="add-plan">Agregar servicio</button>
            )}
            {serviceList.map((service, index) => (
                <section className="files-section">
                <div className="plans-file">
                <label>Nombre del servicio</label>
                <select
                    className="plan-file-select"
                    name="service_id"
                    onChange={(e) => handleServiceChange(index, e)}
                    value={service.id}>
                    <option>Escoja una opción</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                </select>
                </div>
                <div className="plans-file">
                <label>Plan</label>
                <input
                    name="plan"
                    type="tel"/>
                </div> 
                <div className="plans-file"> 
                <label>Fecha de inicio</label>
                <input
                    name="entry_date"
                    type="date"/>
                </div> 
                <div className="plans-file">
                <label>Duración</label>
                <select name="period" className="plan-file-select">
                    <option>1 mes</option>
                </select>
                </div>
                {serviceList.length > 1 && (
                    <button 
                        onClick={() => handleServiceRemoveButton(index)}
                        className="remove-button"
                        type="button">Remover</button>)}
                </section>
            ))}
            <button
                type="button">Guardar</button>
        </form> 
    </>  
    )}
