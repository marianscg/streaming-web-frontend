import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css';

export const ExitModal = () => {

  return (
    <>
        <Link to='/login'>
            <button className='exit-modal' type="button">Cerrar sesión</button>
        </Link>
    </>)}
