import { useEffect, useState } from "react";
import { createPlan } from "./plans";

export const CreatePlans = ({ id }) => {
    
    const [plansList, setPlansList] = useState([
        {   name: "",
            profiles_per_plan: "",
            price: "",
            duration: "" }, 
    ]);

    // Agregar un nuevo plan a la lista
    const handlePlansList = () => {
        setPlansList([
            ...plansList,
            { name: "", profiles_per_plan: "", price: "", duration: "" },
        ]);
    };

    // Eliminar un plan de la lista
    const handlePlansRemoveButton = (index) => {
        const list = [...plansList];
        list.splice(index, 1);
        setPlansList(list);
    };

    // Actualizar los datos de un plan específico
    const handlePlanChange = (index, event) => {
        const { name, value } = event.target;
        const updatedPlans = [...plansList];
    
        // Convierte a número si el campo debe contener un número
        updatedPlans[index][name] =
            name === "price" || name === "profiles_per_plan"
                ? Number(value)
                : value;
    
        setPlansList(updatedPlans);
    };

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        const payload = {
            servicePlans: [
                ...plansList
            ]
        }
        createPlan(event, payload, id)
        
    };
    
    return (
        <>
            <h1 className="form-tittle">Crear planes</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                {plansList.length >= 1 && plansList.length < 5 && (
                    <button
                        onClick={handlePlansList}
                        type="button"
                        className="add-plan"
                    >
                        Agregar plan
                    </button>
                )}
                {plansList.map((plan, index) => (
                    <section className="files-section" key={index}>
                        <div className="plans-file">
                            <label>Nombre</label>
                            <input
                                name="name"
                                value={plan.name}
                                type="text"
                                onChange={(e) => handlePlanChange(index, e)}
                            />
                        </div>
                        <div className="plans-file">
                            <label>Perfiles disponibles</label>
                            <input
                                name="profiles_per_plan"
                                type="tel"
                                value={plan.profiles_per_plan}
                                onChange={(e) => handlePlanChange(index, e)}
                            />
                        </div>
                        <div className="plans-file">
                            <label>Precio</label>
                            <input
                                name="price"
                                type="number"
                                value={plan.price}
                                onChange={(e) => handlePlanChange(index, e)}
                            />
                        </div>
                        <div className="plans-file">
                            <label>Duración</label>
                            <select
                                name="duration"
                                className="plan-file-select"
                                value={plan.duration}
                                onChange={(e) => handlePlanChange(index, e)}
                            >   
                                <option value="">Escoja una opción</option>
                                <option value="1 mes">1 mes</option>
                                <option value="3 meses">3 meses</option>
                                <option value="6 meses">6 meses</option>
                                <option value="12 meses">12 meses</option>
                            </select>
                        </div>
                        {plansList.length > 1 && (
                            <button
                                onClick={() => handlePlansRemoveButton(index)}
                                className="remove-button"
                                type="button"
                            >
                                Remover
                            </button>
                        )}
                    </section>
                ))}
                <button type="submit">Guardar</button>
            </form>
        </>
    );
};
