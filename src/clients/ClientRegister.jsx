import { useModal } from "../hooks/useModal";
import { AddServiceModal } from "./AddServiceModal";

export const ClientRegister = () => {
    const { isOpen, changeToOpen } = useModal();
    
    return (
    <>
       <h1 className="form-tittle">Registrar cliente</h1>
        <form className="register-form">
            <label>Nombre y apellido</label>
            <input
                type="text"/>
            <label>Número de contacto</label>
            <input
                type="tel"/>
            <button
                type="button"
                onClick={changeToOpen}>Continuar</button>
            {isOpen && 
            <div className="overlay-plans">
                <div className="form-container">
                    <div className="exit-button-container">
                        <button 
                            className="exit-button"
                            type="button"
                            onClick={changeToOpen}><svg className="exit-img" width="15px" height="15px"></svg></button>
                    </div>
                    <AddServiceModal/>
                </div>
            </div>}
        </form>
    </>    
    )}
