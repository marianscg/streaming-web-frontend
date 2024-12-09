import { useEffect, useState } from "react";
import "./plans.css";
import axios from "axios";
import { config } from "../config/envs";
import { getServiceById } from "./service";
import { CreatePlans } from "./CreatePlans";

export const PlanDetails = ({ id }) => {
  const [plansList, setPlansList] = useState([]);
  const [services, setServices] = useState("");
  const [createPlans, setCreatePlans] = useState(false);
  const [editablePlanId, setEditablePlanId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handlePlansList = async (id) => {
    const response = await getServiceById(id);
    if (response) {
      setPlansList(response.service_plans);
      setServices(response);
    }
  };

  useEffect(() => {
    handlePlansList(id);
  }, [id]);

  const handleEdit = (plan) => {
    setEditablePlanId(plan.id);
    setEditValues({ ...plan }); // Copia los valores del plan actual al estado local
  };

  const handleSave = async (planId) => {
    try {
      // Normaliza los datos de editValues antes de enviarlos
      const normalizedEditValues = {
        ...editValues,
        price: Number(editValues.price) || 0, // Asegurar que sea número
        profiles_per_plan: Number(editValues.profiles_per_plan) || 0, // Asegurar que sea número
      };

      await axios.patch(
        `${config.apiBaseUrl}/services/${planId}/edit`,
        normalizedEditValues
      ); // Supuesto endpoint

      const updatedPlans = plansList.map((plan) =>
        plan.id === planId ? { ...plan, ...normalizedEditValues } : plan
      );

      setPlansList(updatedPlans);
      setEditablePlanId(null);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Parsear los valores de price y profiles_per_plan explícitamente como números
    setEditValues((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "profiles_per_plan"
          ? Number(value) || 0 // Convertir a número explícitamente
          : value, // Dejar el valor tal como está
    }));
  };

  return (
    <>
      <h1 className="form-plans-tittle">{services.name}</h1>
      <button
        type="button"
        className="button-plan-details"
        onClick={() => setCreatePlans(!createPlans)}
      >
        Agregar plan
      </button>
      {createPlans && (
        <div className="overlay">
          <div className="form-container">
            <div className="exit-button-container">
              <button
                className="exit-button"
                type="button"
                onClick={() => setCreatePlans(!createPlans)}
              >
                <svg className="exit-img" width="15px" height="15px"></svg>
              </button>
            </div>
            <CreatePlans id={id} />
          </div>
        </div>
      )}
      <form className="plans-details-form">
        {plansList.map((plan) => (
          <section key={plan.id} className="files-section-details">
            <div className="plans-file">
              <label>Nombre</label>
              <input
                name="name"
                type="text"
                value={editablePlanId === plan.id ? editValues.name : plan.name}
                onChange={editablePlanId === plan.id ? handleChange : null}
                disabled={editablePlanId !== plan.id}
              />
            </div>
            <div className="plans-file">
              <label>Pantallas</label>
              <input
                name="profiles_per_plan"
                type="number"
                value={
                  editablePlanId === plan.id
                    ? editValues.profiles_per_plan
                    : plan.profiles_per_plan
                }
                onChange={editablePlanId === plan.id ? handleChange : null}
                disabled={editablePlanId !== plan.id}
              />
            </div>
            <div className="plans-file">
              <label>Precio</label>
              <input
                name="price"
                type="number"
                value={
                  editablePlanId === plan.id ? editValues.price : plan.price
                }
                onChange={editablePlanId === plan.id ? handleChange : null}
                disabled={editablePlanId !== plan.id}
              />
            </div>
            <div className="plans-file">
              <label>Duración</label>
              <select
                name="duration"
                value={
                  editablePlanId === plan.id
                    ? editValues.duration
                    : plan.duration
                }
                onChange={editablePlanId === plan.id ? handleChange : null}
                disabled={editablePlanId !== plan.id}
              >
                <option value={plan.duration}>{plan.duration}</option>
              </select>
            </div>
            <div className="plans-file">
              {editablePlanId === plan.id ? (
                <button type="button" onClick={() => handleSave(plan.id)}>
                  Guardar
                </button>
              ) : (
                <button type="button" onClick={() => handleEdit(plan)}>
                  Editar
                </button>
              )}
            </div>
          </section>
        ))}
      </form>
    </>
  );
};
