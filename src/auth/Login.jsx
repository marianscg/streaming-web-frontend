import { useNavigate } from 'react-router-dom'
import './login.css'
import { useForm } from '../hooks/useForm'
import { handleAuth } from './auth';
export const Login = () => {
    const { formData, handleChange, email, password } = useForm({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        handleAuth(event, formData, navigate)
        
    }

return (
    <div className="login-container">
    <main className="login-form">
        <svg className="rplay-logo"></svg>
        <p>Bienvenid@</p>
        <form onSubmit={handleSubmit}>
        <h1>Inicia sesión</h1>
            <div className="input-content">
                <label>
                    Correo electrónico
                </label>
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}>
                </input>
            </div>
            <div className="input-content">
                <label>
                    Contraseña
                </label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}>
                </input>
            </div>
            <button type="submit">Ingresar</button>
        </form>
    </main>
    <div className='background-image'></div>
    </div>
)}
