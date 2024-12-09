
export const ClientDetails = () => {
    return (
        <>
            <h2 className="secundary-tittle">Datos personales</h2>
            <form className="register-form">
            <label>Nombre y apellido</label>
            <input
                type="text"
                disabled/>
            <label>Número de contacto</label>
            <input
                type="tel"
                disabled/>
            <h2 className="secundary-tittle">Servicios contratados</h2>
            <label>Nombre del servicio</label>
            <input
                type="text"
                disabled/>
            <label>Plan contratado</label>
            <input
                type="text"
                disabled/>
            <label>Fecha de inicio</label>
            <input
                type="date"
                disabled/>
            <label>Fecha de corte</label>
            <input
                type="date"
                disabled/>
        </form>
        </>
    )}
