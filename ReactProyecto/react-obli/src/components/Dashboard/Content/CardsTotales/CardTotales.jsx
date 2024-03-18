import { useSelector } from "react-redux";
import "../content.css";

const CardTotales = () => {
  const censados = useSelector((state) => state.perUsu.listaPersonasUsu);
  const censadosTotales = useSelector((state) => state.perCen.listaPersonasCen);
  const montevideo = censados.filter((d) => d.departamento === 3218);
  const restoPais = censados.filter((d) => d.departamento !== 3218);
  return (
    <div class="row">
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Censados en Montevideo
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {montevideo.length}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Resto del País
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {restoPais.length}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Censados totales por el usuario
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {censados.length}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Porcentaje de censados:
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {((censados.length * 100) / censadosTotales).toFixed(3)}%
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardTotales;
