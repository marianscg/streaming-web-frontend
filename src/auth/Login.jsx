import { useNavigate } from 'react-router-dom'
import './login.css'
import { useForm } from '../hooks/useForm'
import { handleAuth } from './auth';
import * as Yup from 'yup';
import { useState } from 'react';
import { useEffect } from 'react';
import { useValidate } from '../hooks/useValidate';
//objeto para validaciones 

const formDataValidation = Yup.object({
    email: Yup.string().email().required("El correo electronico es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

export const Login = () => {
    const { formData, handleChange, email, password } = useForm({
        email: '',
        password: '',
    });
    
    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false); //Controla si se ha realizado el evento en handleSubmit
    const [isFormValid, setIsFormValid] = useState(true); //isFormValid controla hacer la peticion a la API solo si no hay errores
    const [loginError, setLoginError] = useState(false);//Error para datos incorrectos
    
    //Validaciones
    const { errors, handleValidations } = useValidate(
        formDataValidation,
        formData
    );
    //Funcion para manejar el estado de isFormValid
    const handleIsFormValid = async() => {
        const isValid = await handleValidations()
            setIsFormValid(isValid)
            // console.log(isFormValid)
    }
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsSubmitted(true);
        if(isFormValid){
        const error = await handleAuth(event, formData, navigate)
        setLoginError(error);
        }
    }
    
    useEffect(() => {
        if (isSubmitted) handleIsFormValid();
      }, [isSubmitted, handleValidations]);
    
    
return (
    <div className="login-container">
    <main className="login-form">
        <svg className="rplay-logo"></svg>
        <p>Bienvenid@</p>
        <form onSubmit={handleSubmit}>
        <h1>Inicia sesión</h1>
            {loginError && <p className="error-text">El correo o la contraseña ingresada son incorrectos</p>}
            <div className="input-content">
                <label>
                    Correo electrónico
                </label>
                {errors.email && <p className="error-text">{errors.email}</p>}
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
                {errors.password && <p className="error-text">{errors.password}</p>}
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
