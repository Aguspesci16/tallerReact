import Button from "../UI/Button/Button";
import { useState, useRef, useEffect } from "react";
import Alert from "../UI/Alert/Alert";
import { fetchLogin } from "../Api/api";
import logoCenso from "./img/logo_censo.svg";
import "react-notifications/lib/notifications.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { onLogin } from "../../Application/slices/usuarioSlice";

const Login = () => {
  const [message, setMessage] = useState('');
  const [classColor, setClassColor] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const username = useRef();
  const password = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.userLogged)

  useEffect(() => {
      if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const _onLogin = ({ apiKey, id }) => {
    dispatch(onLogin({ apiKey, id }));
    navigate("/dashboard");
  };

  const _isEmptyForm = () => {
    return (
      username.current.value.length === 0 || password.current.value.length === 0
    );
  };

  const _onHandleChange = () => {
    if (!_isEmptyForm()) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const _onHandleLogin = (e) => {
    e.preventDefault();
    if (!_isEmptyForm()) {
      setShowAlert(true);
      fetchLogin(username.current.value, password.current.value)
        .then((resp) => {
          setMessage("Login exitoso");
          setClassColor("success mt-2 mb-1");

          setTimeout(() => {
            // Funcion de App
            _onLogin(resp);
          }, 2000);
        })
        .catch((e) => {
          setShowAlert(true);
          setMessage(e.message);
          setClassColor("danger");
        });
    } else {
      setShowAlert(true);
      setMessage("Por favor complete los campos");
      setClassColor("danger");
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
          <div className="row col-12 justify-content-center">
            <img src={logoCenso} alt="Logo Censo" className="col-9"/>
          </div>
          <div className="row mt-4 w-100 m-0">
            <input
              type="text"
              name="username"
              className="form-control"
              id="txtUser"
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
              id="txtUser"
              ref={password}
            />
          </div>
          <div className="mt-4">
            <Button
              cta={"Iniciar Sesión"}
              classColor={"btn-primary col-12"}
              onHandleClick={_onHandleLogin}
              disabled={btnDisabled}
            />
            <Link to="/register">
              <Button
                cta={"Registrarse"}
                classColor={"btn-success col-12 mt-2"}
              />
            </Link>
            {showAlert ? (
              <Alert classColor={classColor} message={message} />
            ) : (
              ""
            )}
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
export default Login;
