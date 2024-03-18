import AgregarCenso from "./AgregarCenso/CensarPersona";
import GraficoDpto from "./Metricas/GraficosDepartamentos/GraficosDepartamentos";
import GraficoOcu from "./Metricas/GraficosOcupaciones/GraficosOcupaciones";
import CountdownTimer from "./CountDown/CountDown";
import Mapa from './Mapa/Mapa'
import NavBar from "../NavBar/NavBar";
import ListCensados from "./ListCensados/ListCensados";
import CardsTotales from "./CardsTotales/CardTotales";
import "./content.css";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsFillMapFill } from "react-icons/bs";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Content = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const openPopup2 = () => {
    setIsOpen2(true);
  };

  const closePopup2 = () => {
    setIsOpen2(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-12 navBar">
          <NavBar />
        </div>
      </div>
      <div className="row">
        <div className="col-2 bg-dark">
          <div className="bg-white mt-3 navBar">
            <ul className="menu">
              <li className="p-1">
                <div className="row mt-3">
                  <div className="col-2">
                    <IoPersonAddSharp />
                  </div>
                  <div className="col-10 text-left">
                    <button className="linkMenu" onClick={openPopup}>
                      Agregar Persona
                    </button>
                  </div>
                </div>
              </li>
              <li className="p-1 mt-2 ">
                <div className="row">
                  <div className="col-2">
                    <BsFillMapFill />
                  </div>
                  <div className="col-10 text-left mb-3"><button className="linkMenu" onClick={openPopup2}>
                      Mapa
                    </button></div>
                </div>
              </li>
            </ul>
          </div>
        <div className="bg-white countdown">
        <CountdownTimer/>
        </div>
        </div>
        <div className="col-10 bg-dark">
          <div className="col-12 mt-3 bg-white contenido">
            <div className="p-3">
              <CardsTotales />
            </div>
            <div className="p-3">
              <div className="row">
                <div className="col-6 justify-content-center">
                  <h2>Gráfica por departamento</h2>
                  <GraficoDpto />
                </div>
                <div className="col-6">
                  <h2>Gráfica por ocupación</h2>
                  <GraficoOcu />
                </div>
                <div className="row">
                  <Popup
                    open={isOpen}
                    closeOnDocumentClick
                    onClose={closePopup}
                    position="center center"
                    className="agregarPersona"

                  >
                      <AgregarCenso />
                  </Popup>
                  <Popup
                    open={isOpen2}
                    closeOnDocumentClick
                    onClose={closePopup2}
                    position="center center"
                    className="agregarPersona"
                  >
                      <Mapa />
                  </Popup>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  <h2 className="mb-4 mt-3">Lista de personas censadas</h2>
                  <ListCensados />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
