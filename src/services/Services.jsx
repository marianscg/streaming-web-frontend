import React, { useEffect, useState } from "react";
import { NavBar } from "../navbar/NavBar";
import "./services.css";
import { PreviewServiceGrid } from "./PreviewServiceGrid";
import { useModal } from "../hooks/useModal";
import { CreateService } from "./CreateService";
import { getServiceByName } from "./service";

export const Services = () => {
    const { isOpen, changeToOpen } = useModal();
    const [inputSearchValue, setInputSearchValue] = useState(''); //maneja los cambios del input de busqueda
    const [inputSearchedValue, setInputSearchedValue] = useState([]); //guarda el valor del input de busqueda


    const handleGetServiceByName = async (value) => {
          const serviceByName = await getServiceByName(value);
          setInputSearchedValue(serviceByName);
        };
    
    const handleChangeInputSearchValue = ({target}) => {
        setInputSearchValue(target.value);
        console.log('esto es inputSearchedValue', inputSearchedValue);
    }
    
    useEffect(() => {
        handleGetServiceByName(inputSearchValue);
        if (inputSearchValue.trim().length <= 1) setInputSearchedValue([]);
    }, [inputSearchValue]);


    return (
    <>
        <NavBar />
        <main className="main-content">
            <section className="section-menu">
                <button
                  className="register-button"
                  type="button"
                  onClick={changeToOpen}
                >
                  Registrar servicio
                </button>
                {isOpen && (
                    <div className="overlay">
                        <div className="form-container">
                            <div className="exit-button-container">
                                <button
                                    className="exit-button"
                                    type="button"
                                    onClick={changeToOpen}>
                                  <svg className="exit-img" width="15px" height="15px"></svg>
                                </button>
                            </div>
                            <CreateService />
                        </div>
                    </div>
                )}
              <div className="input-search-container">
                <svg className="icon-search" width="25px" height="25px"></svg>
                <input
                    className="input-search"
                    name="streaming"
                    placeholder="Buscar servicio"
                    value={inputSearchValue}
                    onChange={handleChangeInputSearchValue}
                />
              </div>
            </section>
            <h1 className="tittle">Todos los servicios de streaming</h1>
            <PreviewServiceGrid inputSearch={inputSearchedValue}/>
        </main>
    </>
    )};
