import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const SubSection = () => {
  const departamentos = useSelector((state) => state.depa.departamentos);
const censados = useSelector((state)=> state.perUsu.listaPersonasUsu);

let departamentosMapa = [];

departamentos.forEach((d) => {
    const { id } = d;
    const totalPorDpto = contarTotalUsuariosPorDptoId(id);
    let newDepartamento ={
        latitud: d.latitud,
        longitud: d.longitud,
        nombre: d.nombre,
        cantidad: totalPorDpto
    }
    departamentosMapa.push(newDepartamento);
  });

  function contarTotalUsuariosPorDptoId(id) {
    let contadorCensos = 0;
    censados.forEach((c) => {
      if (c.departamento === id) {
        contadorCensos++;
      }
    });
    return contadorCensos;
  }

  return (
    <>
      <div className="col-12">
        <div className="card-body">
          <MapContainer
            center={[-32.81461649853357, -55.927466908701255]}
            zoom={7}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {departamentosMapa.map(({ latitud, longitud, nombre, cantidad }) => (
              <Marker position={[latitud, longitud]}>
                <Popup>
                  Total censados en {nombre}: {cantidad}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default SubSection;
