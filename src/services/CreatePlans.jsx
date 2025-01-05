import { useEffect, useState } from "react";
import { createPlan } from "./plans";
import * as Yup from "yup";

// Esquema de validación de Yup para cada plan
const planSchema = Yup.object().shape({
    name: Yup.string()
      .required("El nombre del plan es requerido")
      .min(1, "El nombre del plan es requerido")
      .max(10, "El nombre del plan no puede tener más de 10 caracteres"),
    profiles_per_plan: Yup.number()
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .typeError("El número de perfiles debe ser un número")
      .required("El número de perfiles es requerido")
      .positive("El número de perfiles debe ser mayor a 0")
      .integer("El número de perfiles debe ser un entero"),
    price: Yup.number()
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .typeError("El precio debe ser un número")
      .required("El precio es requerido")
      .positive("El precio debe ser mayor a 0"),
    duration: Yup.string()
      .required("La duración es requerida")
      .oneOf(["1 mes", "3 meses", "6 meses", "12 meses"], "Duración no válida"),
  });
  

const plansValidationSchema = Yup.array().of(planSchema);

export const CreatePlans = ({ id }) => {
    const [plansList, setPlansList] = useState([
        { name: "", profiles_per_plan: "", price: "", duration: "" },
    ]);

    const [errors, setErrors] = useState([]); // Estado para manejar los errores

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

        updatedPlans[index][name] =
            name === "price" || name === "profiles_per_plan"
                ? Number(value)
                : value;

        setPlansList(updatedPlans);
    };

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del form

        try {
            await plansValidationSchema.validate(plansList, { abortEarly: false });
            const payload = {
                servicePlans: [...plansList],
            };
            createPlan(event, payload, id);
        } catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce((acc, error) => {
                const index = error.path.split("[")[1].split("]")[0]; // Obtener el índice del error
                const field = error.path.split(".")[1]; // Obtener el campo con error
                acc[index] = { ...acc[index], [field]: error.message };
                return acc;
            }, []);
            setErrors(formattedErrors);
        }
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
                            {errors[index]?.name && <p className="error-text">{errors[index].name}</p>}
                        </div>
                        <div className="plans-file">
                            <label>Perfiles disponibles</label>
                            <input
                                name="profiles_per_plan"
                                type="tel"
                                value={plan.profiles_per_plan}
                                onChange={(e) => handlePlanChange(index, e)}
                            />
                            {errors[index]?.profiles_per_plan && (
                                <p className="error-text">{errors[index].profiles_per_plan}</p>
                            )}
                        </div>
                        <div className="plans-file">
                            <label>Precio</label>
                            <input
                                name="price"
                                type="number"
                                value={plan.price}
                                onChange={(e) => handlePlanChange(index, e)}
                            />
                            {errors[index]?.price && <p className="error-text">{errors[index].price}</p>}
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
                            {errors[index]?.duration && <p className="error-text">{errors[index].duration}</p>}
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