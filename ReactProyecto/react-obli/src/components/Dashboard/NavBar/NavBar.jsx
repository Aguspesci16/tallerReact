import * as React from "react";
import { removeUserFromLocalStorage } from "../../../storage/Storage";
import { useDispatch } from "react-redux";
import { onLogout } from "../../../Application/slices/usuarioSlice";
import loguito from '../../Login/img/logo_censo.svg'

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const _Logout = (e) => {
    e.preventDefault();
    removeUserFromLocalStorage();
    dispatch(onLogout());
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <img src={loguito} alt="LogoCenso" className="logoCenso"/>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          
        </ul>
        <button className="linkMenu" onClick={_Logout}>Cerrar Sesión</button>
      </div>
    </nav>
  );
}
