import { useEffect, useState } from 'react';
import './plans.css';
import axios from 'axios';
import { config } from '../config/envs';
import { getServiceById } from './service';
import { CreatePlans } from './CreatePlans';
import { useForm } from '../hooks/useForm';

export const PlanDetails = ({ id }) => {

    const [plansList, setPlansList] = useState([]);
    const [services, setServices] = useState("");
    const [createPlans, setCreatePlans] = useState(false);


    const handlePlansList = async(id) => {
        const response = await getServiceById(id);
        if(response) {
        setPlansList(response.service_plans);
        setServices(response);
        }
    }

    useEffect(() => {
        handlePlansList(id);
    }, [id])
      
    return (
    <>
        <h1 className="form-plans-tittle">{services.name}</h1>
        <button 
            type="button"
            className="button-plan-details"
            onClick={() => setCreatePlans(!createPlans)}>Agregar plan</button>
        {createPlans && (
            <div className="overlay">
                <div className="form-container">
                <div className="exit-button-container">
                    <button 
                        className="exit-button"
                        type="button"
                        onClick={() => setCreatePlans(!createPlans)}><svg className="exit-img" width="15px" height="15px"></svg></button>
                </div>
                    <CreatePlans id={id}/>
                </div>
                </div>
        )}
        <form className="plans-details-form">
            {plansList.map((plan, index) => (
                <section key={plan.id} className="files-section-details">
                    <div className="plans-file">
                        <label>Nombre</label>
                        <input
                            name="name"
                            type="text"
                            value={plan.name}/>
                    </div>
                    <div className="plans-file">
                        <label>Pantallas</label>
                        <input
                            name="profiles_per_plan"
                            type="tel"
                            value={plan.profiles_per_plan}
                            disabled/>
                    </div> 
                    <div className="plans-file"> 
                        <label>Precio</label>
                        <input
                            name="price"
                            type="number"
                            value={plan.price}
                            disabled/>
                    </div> 
                    <div className="plans-file">
                        <label>Duración</label>
                        <select name="duration" disabled>
                            <option value={plan.duration}>{plan.duration}</option>
                        </select>
                    </div>
                    <div className="plans-file">
                        <button
                            type="button">
                            Editar
                        </button>
                    </div>
                </section>
            ))}
        </form>
    </>)}
