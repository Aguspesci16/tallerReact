import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../UI/Button/Button";
import { onDeleteLoadPerUsu } from "../../../../Application/slices/personasUsuarioSlice";
import { fetchEliminarCenso } from "../../../Api/api";

const DataTable = () => {
  const ListadoPersonas = useSelector((state) => state.perUsu.listaPersonasUsu);
  const departamentos = useSelector((state) => state.depa.departamentos);
  const ocupaciones = useSelector((state) => state.ocu.ocupaciones);
  const ciudades = useSelector((state) => state.ciud.ciudades);
  const dispatch = useDispatch();
  const usuarioActual = useSelector((state)=> state.user.userLogged)

  const columns = [
    { field: "Nombre", headerName: "Nombre", width: 250 },
    { field: "Departamento", headerName: "Departamento", width: 250 },
    { field: "Ciudad", headerName: "Ciudad", width: 250 },
    { field: "FechaNac", headerName: "Fecha Nacimiento", width: 250 },
    {
      field: "Ocupacion",
      headerName: "Ocupación",
      width: 250,
    },
    {
      field: "actions",
      headerName: "Eliminar",
      width: 200,
      renderCell: (params) => (
        <Button
          cta={"Eliminar"}
          classColor={"btn-danger"}
          onHandleClick={() => _deleteCensado(params.row.id)} // Pasa el ID al hacer clic
        />
      ),
    },
  ];

  const _getDepartamento = (id) => {
    const encontrado = departamentos.find((elemento) => elemento.id === id);
    if (encontrado === undefined) {
      return "No existe el departamento";
    }
    return encontrado.nombre;
  };

  const _getOcupacion = (id) => {
    console.log(id);
    const encontrado = ocupaciones.find((elemento) => elemento.id === id);
    if (encontrado === undefined) {
      return "No existe la ocupación";
    }
    return encontrado.ocupacion;
  };

  const _getCiudad = (id) => {
    const encontrado = ciudades.find((elemento) => elemento.id === id);
    if (encontrado === undefined) {
      return "No existe la ciudad";
    }
    return encontrado.nombre;
  };

  const _deleteCensado = (id) => {
    fetchEliminarCenso(usuarioActual.apiKey, usuarioActual.id, id);
    dispatch(onDeleteLoadPerUsu(id));
  };

  const rows = ListadoPersonas.map((fila) => ({
    id: fila.id,
    Nombre: fila.nombre,
    Departamento: _getDepartamento(fila.departamento),
    Ciudad: _getCiudad(fila.ciudad),
    FechaNac: fila.fechaNacimiento,
    Ocupacion: _getOcupacion(fila.ocupacion),
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowSelection={false}
        getRowId={(row) => rows.indexOf(row)} // Utiliza el índice como identificador único
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </div>
  );
};
export default DataTable;
