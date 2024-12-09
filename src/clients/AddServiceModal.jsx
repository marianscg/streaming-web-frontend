import { useState } from 'react'

export const AddServiceModal = () => {
    const [serviceList, setServiceList] = useState([{
        name: "",
        plan: "",
        entry_date: "",
        period: "",
    }])

    const handleServicesList = () => {
            setServiceList([...serviceList, {
                name: "",
                plan: "",
                entry_date: "",
                period: "",
            }])
        }

    const handleServiceRemoveButton = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    }

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
