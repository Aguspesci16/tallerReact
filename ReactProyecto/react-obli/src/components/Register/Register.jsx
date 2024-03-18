import Button from "../UI/Button/Button";
import { useState, useRef } from "react";
import Alert from "../UI/Alert/Alert";
import { fetchRegister } from "../Api/api";
import { onLogin } from "../../Application/slices/usuarioSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import logoCenso from "../Login/img/logo_censo.svg";
import { Link } from "react-router-dom";

const Register = () => {
  const [message, setMessage] = useState("");
  const [classColor, setClassColor] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const username = useRef();
  const password = useRef();
  const secondPassword = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _isEmptyForm = () => {
    return (
      username.current.value.length === 0 ||
      password.current.value.length === 0 ||
      secondPassword.current.value.length === 0
    );
  };

  const _passwordState = () => {
    const pass = password.current.value;
    const passConfirm = secondPassword.current.value;
    return pass === passConfirm && pass.length > 0 && passConfirm.length > 0;
  };

  const _onHandleChange = () => {
    if (!_isEmptyForm()) {
      if (_passwordState()) {
        setBtnDisabled(false);
        setShowAlert(false);
      } else {
        setBtnDisabled(true);
        setShowAlert(true);
        setMessage("Las contraseñas no coinciden");
        setClassColor("danger mt-3");
      }
    } else {
      setShowAlert(false);
      setBtnDisabled(true);
    }
  };

  const _onHandleRegister = (e) => {
    e.preventDefault();
    if (!_isEmptyForm()) {
      fetchRegister(username.current.value, password.current.value)
        .then((resp) => {
          setMessage("Registro Exitoso");
          setClassColor("success mt-3");
          setShowAlert(true);

          setTimeout(() => {
            // Funcion de App

            dispatch(onLogin(resp));
            navigate("/dashboard");
          }, 2000);
        })
        .catch((e) => {
          setMessage(e.message);
          setClassColor("danger mt-3");
          setShowAlert(true);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="divLogin col-3">
        <form>
        <div className="col-12 justify-contet-center">
          <img src={logoCenso} alt="logo Censo" className="col-9" />
        </div>
          <div className="row">
            <img alt="" className="imgLogo" />
          </div>
          <div className="row mt-4 w-100 m-0">
            <input
              type="text"
              name="username"
              className="form-control"
              ref={username}
              placeholder="Usuario"
              onChange={_onHandleChange}
              required
            />
          </div>
          <div className="row mt-4 w-100 m-0">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="form-control"
              onChange={_onHandleChange}
              ref={password}
            />
          </div>
          <div className="row mt-4 w-100 m-0">
            <input
              type="password"
              name="password"
              placeholder="Repetir contraseña"
              className="form-control"
              onChange={_onHandleChange}
              id="txtUser"
              ref={secondPassword}
            />
          </div>
          {showAlert ? <Alert classColor={classColor} message={message} /> : ""}
          <div className="row mt-4 m-0">
            <Button
              cta={"Registrarse"}
              classColor={"btn-primary col-12"}
              onHandleClick={_onHandleRegister}
              disabled={btnDisabled}
            />
          </div>
          <Link to="/login">
              <Button
                cta={"Volver"}
                classColor={"btn-danger col-12 mt-2"}
              />
            </Link>
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
export default Register;
