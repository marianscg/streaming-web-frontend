import { useEffect, useState } from 'react';
import { getServices } from '../services/service';
import { assignAccount, getAccountsByIdService, getPlansByService } from './manageClients';


export const AddServiceModal = ({ idClient }) => {
    const [serviceList, setServiceList] = useState([{
        service_id: "",
        service_plans_id: "",
        account_id: "",
    }]);
    const [plansList, setPlansList] = useState({});
    const [accountsList, setAccountsList] = useState([]);
    const [clientId, setClientId] = useState(idClient);
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

        const updatedAccountsList = {...accountsList };
        delete updatedAccountsList[index];
        setAccountsList(updatedAccountsList);
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
                const account = await getAccountsByIdService(Number(value));
                setAccountsList((prevAccounts) => ({
                    ...prevAccounts,
                    [index]: account
                }));
            } catch (error) {
                console.error("Error al obtener planes:", error);
            }
        }
    };

    const handleSubmit = async (event) => {

        const filteredServiceList = serviceList.map(({ account_id, service_plans_id }) => ({
            service_plans_id,
            account_id
            
        }));
    
        // Verificar que todos los campos estén completos
        const isValid = filteredServiceList.every(
            (service) => service.service_plans_id && service.account_id 
        );
    
        if (!isValid) {
            alert("Por favor, complete todos los campos antes de enviar.");
            return;
        } else 
        assignAccount(event, filteredServiceList, clientId);
        console.log('esto es filteredServicesList: ',filteredServiceList);
    };

    useEffect(() => {
        setClientId(idClient);
    }, [])

    return (
        <>
            <h1 className="form-tittle">Añadir servicios</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                {serviceList.length >= 1 && serviceList.length < 5 && (
                    <button
                        onClick={handleServicesList}
                        type="button"
                        className="add-plan">Agregar servicio</button>
                )}
                {serviceList.map((service, index) => (
                    <section key={index} className="files-section">
                        <div className="plans-file">
                            <label>Nombre del servicio</label>
                            <select
                                className="plan-file-select"
                                name="service_id"
                                onChange={(e) => handleServiceChange(index, e)}
                                value={service.service_id}>
                                <option>Escoja una opción</option>
                                {services.map((serviceId) => (
                                    <option key={serviceId.id} value={serviceId.id}>{serviceId.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="plans-file">
                            <label>Plan</label>
                            <select
                                className="plan-file-select"
                                name="service_plans_id"
                                onChange={(e) => handleServiceChange(index, e)}
                                value={service.service_plans_id}>
                                <option>Escoja una opción</option>
                                {plansList[index] ? (
                                    plansList[index].map((plan) => (
                                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>No hay planes disponibles</option>
                                )}
                            </select>
                        </div>
                        <div className="plans-file">
                            <label>Asignar cuenta</label>
                            <select
                                className="plan-file-select"
                                name="account_id"
                                onChange={(e) => handleServiceChange(index, e)}
                                value={service.account_id}>
                                <option>Escoja una opción</option>
                                {accountsList[index] ? (
                                    accountsList[index].map((account) => (
                                        <option key={account.id} value={account.id}>{account.email}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>No hay cuentas disponibles</option>
                                )}
                            </select>
                        </div>
                        {serviceList.length > 1 && (
                            <button
                                onClick={() => handleServiceRemoveButton(index)}
                                className="remove-button"
                                type="button">Remover</button>
                        )}
                    </section>
                ))}
                <button
                    type="submit">Guardar</button>
            </form>
        </>
    );
};
