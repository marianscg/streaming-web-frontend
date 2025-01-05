
import { Link, NavLink, Router } from 'react-router-dom';
import './navbar.css';
import { useModal } from '../hooks/useModal';
import { ExitModal } from './ExitModal';

export const NavBar = () => {
    	const { isOpen, changeToOpen } = useModal();

  return (
    <>  
        <nav>
            <div>
            <section className="rplay-logo-negro">
                <img src="./public/assets/rplay-negrologo.svg" width="78px" height="78px"></img>
            </section>
            <div className="navbar-container">
                <NavLink 
                    to='/services' 
                    className={({ isActive }) => isActive ? "active" : ""}>
                    Streaming
                </NavLink>
                <NavLink 
                    to='/clients'
                    className={({ isActive }) => isActive ? "active" : ""}>
                    Clientes
                </NavLink>
                {/* <NavLink 
                    to='/bills' 
                    className={({ isActive }) => isActive ? "active" : ""}>
                    Control de ingresos
                </NavLink> */}
            </div>
            </div>
            <div>
                <button  
                    className="user-info"
                    type="button"
                    onClick={changeToOpen}>
                <img  className="user-icon" src="./public/assets/rplay-icon-user.svg" width="45px" height="45px"></img>
                <div className="user-text">
                    <p className="username">Marian Carrero</p>
                    <p className="user-rol">Administrador</p>
                </div>
                </button>
                {isOpen && <>
                    <ExitModal/>
                </>}
            </div>
        </nav>
    </>
  )}