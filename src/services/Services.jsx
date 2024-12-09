import React, { useEffect, useState } from "react";
import { NavBar } from "../navbar/NavBar";
import "./services.css";
import { PreviewServiceGrid } from "./PreviewServiceGrid";
import { useModal } from "../hooks/useModal";
import { CreateService } from "./CreateService";
import { getServiceById } from "./service";
export const Services = () => {
    const { isOpen, changeToOpen } = useModal();
    const [inputSearchService, setInputSearchService] = useState()
    // const searchService = async (value) => {
    //   const serviceById = await getServiceByName(value);
    //   setInputCategory(categoryByName);
    // };
  
    // const onChange = ({ target }) => {
    //   setInputValue(target.value);
    // };
  
    // useEffect(() => {
    //   setAndGetCategories();
    // }, []);
  
    // useEffect(() => {
    //   searchService(inputValue);
    //   if (inputValue.trim().length <= 1) setInputCategory([]);
    // }, [inputValue]);
  


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
                    onClick={changeToOpen}
                  >
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
              value=""
              onChange=""
            />
          </div>
        </section>
        <h1 className="tittle">Todos los servicios de streaming</h1>
        <PreviewServiceGrid />
      </main>
    </>
  );
};
