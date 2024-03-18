const URL_API = "https://censo.develotion.com";

const fetchLogin = async (username, password) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: username,
      password: password,
    }),
  };
  try {
    const response = await fetch(`${URL_API}/login.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((resp) => {
        const { apiKey, id } = resp;
        return Promise.resolve({
          apiKey,
          id,
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: "Ha ocurrido un error",
    });
  } catch (error) {
    return Promise.reject({
      message: error,
    });
  }
};

const fetchRegister = async (username, password) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: username,
      password: password,
    }),
  };
  try {
    const response = await fetch(`${URL_API}/usuarios.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((resp) => {
        const { apiKey, id } = resp;
        return Promise.resolve({
          apiKey,
          id,
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: "Ha ocurrido un error",
    });
  } catch (error) {
    return Promise.reject({
      message: error,
    });
  }
};

const fetchAgregarCenso = async (
  apikey,
  userId,
  nombre,
  dpto,
  ciud,
  fecha,
  ocupacion
) => {
  const raw = JSON.stringify({
    idUsuario: userId,
    nombre: nombre,
    departamento: dpto,
    ciudad: ciud,
    fechaNacimiento: fecha,
    ocupacion: ocupacion,
  });

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey,
      iduser: userId,
    },
    body: raw,
  };

  console.log(requestOptions);

  try {
    const response = await fetch(`${URL_API}/personas.php`, requestOptions);
    if (response.status === 200) {
      return response.json().then((resp) => {
        console.log(resp);
        const userData = JSON.parse(raw);
        userData.idCenso = resp.idCenso;
        return Promise.resolve({
          usuario: userData,
          codigo: 200,
        });
      });
    }
    return Promise.reject({
      code: response.status,
      message: "Ha ocurrido un error",
    });
  } catch (error) {
    return Promise.reject({
      message: error,
    });
  }
};

const fetchDepartamentos = async (apiKey, usrId) => {
  try {
    const response = await fetch(`${URL_API}/departamentos.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        iduser: usrId,
      },
    });
    if (!response.ok) {
      return Promise.reject({
        message: "Error en la solicitud",
        code: response.status,
      });
    }
    const data = await response.json();
    return data.departamentos;
  } catch (error) {
    return Promise.reject(error);
  }
};

const fetchEliminarCenso = async (apiKey, usrId, personaId) => {
  try {
    const response = await fetch(
      `${URL_API}/personas.php?idCenso=${personaId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          iduser: usrId,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchPersonasUsuario = async (apiKey, usrId) => {
  try {
    const response = await fetch(`${URL_API}/personas.php?idUsuario=${usrId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        iduser: usrId,
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchPersonasCensadas = async (apiKey, usrId) => {
  try {
    const response = await fetch(`${URL_API}/totalCensados.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        iduser: usrId,
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchCiudades = async (apiKey, id) => {
  try {
    const response = await fetch(`${URL_API}/ciudades.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchOcupaciones = async (apiKey, id) => {
  try {
    const response = await fetch(`${URL_API}/ocupaciones.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchLogin,
  fetchRegister,
  fetchDepartamentos,
  fetchPersonasUsuario,
  fetchPersonasCensadas,
  fetchCiudades,
  fetchOcupaciones,
  fetchAgregarCenso,
  fetchEliminarCenso,
};
