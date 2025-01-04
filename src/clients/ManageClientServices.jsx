import { useState } from "react"
import { getServices } from "../services/service";
import { assignAccount, getPlansByService } from "./manageClients";

export const ManageClientServices = ({ idClient }) => {
        const [serviceList, setServiceList] = useState([{
            service_id: "",
            service_plans_id: "",
            account_id: "",
        }]);
        const [plansList, setPlansList] = useState({});
        const [accounts, setAccounts] = useState([]);
    
        const handleServicesList = () => {
            setServiceList([...serviceList, {
                service_id: "",
                service_plans_id: "",
                account_id: "",
            }]);
        };
        
        const [services, setServices] = useState([]);
        // Obtener servicios al cargar el componente
    
        const handleSelectServices = async () => {
            const rsp = await getServices();
            setServices(rsp);
        };
    
        useEffect(() => {
            handleSelectServices();
        }, []);
    
        const handleServiceRemoveButton = (index) => {
            const list = [...serviceList];
            list.splice(index, 1);
            setServiceList(list);
    
            // Eliminar los planes correspondientes a este servicio
            const updatedPlansList = { ...plansList };
            delete updatedPlansList[index];
            setPlansList(updatedPlansList);
        };
    
        const handleServiceChange = async (index, event) => {
            const { name, value } = event.target;
            const updatedService = [...serviceList];
            updatedService[index][name] =
                name === "account_id" || name === "service_plans_id" ? Number(value) : value;
    
            setServiceList(updatedService);
    
            // Si cambia el servicio, obtener los planes y actualizarlos solo para este índice
            if (name === "service_id") {
                try {
                    const rsp = await getPlansByService(Number(value));
                    setPlansList((prevPlans) => ({
                        ...prevPlans,
                        [index]: rsp.data
                    }));
                } catch (error) {
                    console.error("Error al obtener planes:", error);
                }
            } 
        };
        
        const handleSubmit = async (event) => {
    
            const filteredServiceList = serviceList.map(({ service_id, service_plans_id }) => ({
                service_id,
                service_plans_id
            }));
        
            // Verificar que todos los campos estén completos
            const isValid = filteredServiceList.every(
                (service) => service.service_id && service.service_plans_id
            );
        
            if (!isValid) {
                alert("Por favor, complete todos los campos antes de enviar.");
                return;
            } else 
            assignAccount(event, filteredServiceList, idClient);
        };
    
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
            {serviceList.map((plan, index) => (
                <section className="files-section">
                <div className="plans-file">
                <label>Nombre del servicio</label>
                <input
                    name="name"
                    type="text"/>
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
