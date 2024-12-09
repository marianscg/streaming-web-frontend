import { useEffect, useRef } from "react";

export const TableOptionsModal = ({onClose, onSelectOption}) => {
    
    const modalRef = useRef(null);

    // Manejar el clic fuera del modal
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // Cierra el modal
        }
        };

        // Agregar el evento al documento
        document.addEventListener("mousedown", handleClickOutside);

        // Limpiar el evento al desmontar el componente
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);
    return (
    <>
        <div className="options-container" ref={modalRef}>
            <button
                onClick={() => onSelectOption("client-update")}
                className="option-button">Editar</button>
            <button
                onClick={() => onSelectOption("add-service")}
                className="option-button">Administrar servicios</button>
        </div>
    </>
    )}
