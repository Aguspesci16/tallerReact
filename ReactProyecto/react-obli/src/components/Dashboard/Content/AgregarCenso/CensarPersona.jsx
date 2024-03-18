import { useRef, useState } from "react";
import Button from "../../../UI/Button/Button";
import Alert from "../../../UI/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgregarCenso } from "../../../Api/api";
import {onAddPerUsu} from '../../../../Application/slices/personasUsuarioSlice'

const CensarPersona = () => {
  const [message, setMessage] = useState("");
  const [classColor, setClassColor] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [selectDisabledCiud, setSelectDisabledCiud] = useState(true);
  const [selectDisabledOcu, setSelectDisabledOcu] = useState(true);
  const [ciudadesCombo, setCiudadesCombo] = useState([]);
  const name = useRef();
  const depto = useRef();
  const date = useRef();
  const ciud = useRef();
  const ocu = useRef();

  const dptos = useSelector((state) => state.depa.departamentos);
  const ciudades = useSelector((state) => state.ciud.ciudades);
  const user = useSelector((state) => state.user.userLogged);
  const ocupaciones = useSelector((state) => state.ocu.ocupaciones);
  const dispatch = useDispatch();

  const _isEmptyForm = () => {
    return (
      name.current.value.length === 0 ||
      depto.current.value === "0" ||
      date.current.value === "" ||
      ciud.current.value === "0" ||
      ocu.current.value === "0"
    );
  };

  const _occupationState = () => {
    const edad = date.current.value;
    const fechaNac = new Date(edad);
    const fechaActual = new Date();
    const diferenciaAnio = fechaActual.getFullYear() - fechaNac.getFullYear();
    const diferenciaMes = fechaActual.getMonth() - fechaNac.getMonth();
    const diferenciaDia = fechaActual.getDate() - fechaNac.getDate();
    const esAdulto =
      diferenciaAnio > 18 ||
      (diferenciaAnio === 18 &&
        (diferenciaMes > 0 || (diferenciaMes === 0 && diferenciaDia >= 0)));
    esAdulto ? setSelectDisabledOcu(false) : setSelectDisabledOcu(true);
    ocu.current.value = "5";
    _onHandleChange();
  };

  const _onHandleChange = () => {
    if (!_isEmptyForm()) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const _cargarCiudades = () => {
    if (depto.current.value !== "0") {
      if (user) {
        setSelectDisabledCiud(false);
        const ciudComb = ciudades.filter(
          (ciud) => ciud.idDepartamento === parseInt(depto.current.value)
        );
        setCiudadesCombo(ciudComb);
      }
    } else {
      ciud.current.value = "0";
      setSelectDisabledCiud(true);
    }
    _onHandleChange();
  };

  const _onHandleCensar = (e) => {
    e.preventDefault();
    fetchAgregarCenso(
      user.apiKey,
      user.id,
      name.current.value,
      parseInt(depto.current.value),
      parseInt(ciud.current.value),
      date.current.value,
      parseInt(ocu.current.value)
    )
      .then((resp) => {
        if(resp.codigo === 200){
          console.log(resp)
          dispatch(onAddPerUsu(resp.usuario))
        }
        setMessage("Registro Exitoso");
        setClassColor("success mt-3");
        setShowAlert(true);

        setTimeout(() => {
        }, 2000);
      })
      .catch((e) => {
        setMessage(e.message);
        setClassColor("danger mt-3");
        setShowAlert(true);
      });
  };

  // const _onHandleRegister = (e) => {
  //   e.preventDefault();
  //   if (!_isEmptyForm()) {
  //     fetchRegister(name.current.value, password.current.value)
  //       .then((resp) => {
  //         setMessage("Registro Exitoso");
  //         setClassColor("success mt-3");
  //         setShowAlert(true);

  //         setTimeout(() => {
  //           // Funcion de App
  //           onLogin(resp);
  //         }, 2000);
  //       })
  //       .catch((e) => {
  //           setMessage(e.message);
  //           setClassColor("danger mt-3");
  //           setShowAlert(true);
  //       });
  //   }
  // };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="col-10 justify-content-center">
        <h1>Agregar Censo</h1>
        <form>

          <div className="row mt-4 w-100 m-0">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              className="form-control"
              ref={name}
              onChange={_onHandleChange}
              required
            />
          </div>
          <div className="row mt-4 w-100 m-0">
            <label>Departamento</label>
            <select
              className="form-control"
              onChange={_cargarCiudades}
              ref={depto}
            >
              <option value="0">Seleccione una opción</option>
              {dptos.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="row mt-4 w-100 m-0">
            <label>Ciudad</label>
            <select
              className="form-control"
              disabled={selectDisabledCiud}
              ref={ciud}
              onChange={_onHandleChange}
            >
              <option value="0">Seleccione una opción</option>
              {ciudadesCombo.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="row mt-4 w-100 m-0">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechNac"
              className="form-control"
              ref={date}
              onChange={_occupationState}
              required
            />
          </div>
          <div className="row mt-4 w-100 m-0">
            <label>Ocupación</label>
            <select
              className="form-control"
              disabled={selectDisabledOcu}
              ref={ocu}
              onChange={_onHandleChange}
            >
              <option value="0">Seleccione una opción</option>
              {ocupaciones.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.ocupacion}
                </option>
              ))}
            </select>
          </div>
          {showAlert ? <Alert classColor={classColor} message={message} /> : ""}
          <div className="row mt-4 m-0">
            <Button
              cta={"Agregar censo"}
              classColor={"btn-primary col-12"}
              onHandleClick={_onHandleCensar}
              disabled={btnDisabled}
            />
          </div>
          <div>
            <p id="msgBack" className="text-center"></p>
          </div>
          <div className="row mt-3 divMsgError">
            <label id="msgError"></label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CensarPersona;
