import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCiudades,
  fetchDepartamentos,
  fetchPersonasUsuario,
  fetchPersonasCensadas,
  fetchOcupaciones,
} from "../Api/api";
import { onInitialLoadDep } from "../../Application/slices/departamentosSlice";
import { onInitialLoadPerUsu } from "../../Application/slices/personasUsuarioSlice";
import { onInitialLoadCiud } from "../../Application/slices/ciudadesSlice";
import { onInitialLoadOcu } from "../../Application/slices/ocupacionesSlice";
import Content from "./Content/Content";
import { onInitialLoadPerCen } from "../../Application/slices/personasCensadasSlice";
import { onLogout } from "../../Application/slices/usuarioSlice";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userLogged);

  useEffect(() => {
    if (user) {
      fetchDepartamentos(user.apiKey, user.id)
        .then((resp) => {
          dispatch(onInitialLoadDep(resp));
        })
        .catch((e) => {
          console.log(e);
          if (e.code === 401) {
            dispatch(onLogout());
          }
        });
      fetchCiudades(user.apiKey, user.id)
        .then((resp) => {
          dispatch(onInitialLoadCiud(resp.ciudades));
        })
        .catch((e) => {
          console.error(e.message);
        });
      fetchOcupaciones(user.apiKey, user.id)
        .then((resp) => {
          dispatch(onInitialLoadOcu(resp.ocupaciones));
        })
        .catch((e) => {
          console.error(e.message);
        });
      fetchPersonasUsuario(user.apiKey, user.id)
        .then((resp) => {
          dispatch(onInitialLoadPerUsu(resp.personas));
        })
        .catch((e) => {
          console.error(e.message);
        });
      fetchPersonasCensadas(user.apiKey, user.id)
        .then((resp) => {
          dispatch(onInitialLoadPerCen(resp.total));
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
    setTimeout(() => {}, 2000);
  }, [user, dispatch]);

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-12">
          <Content />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
