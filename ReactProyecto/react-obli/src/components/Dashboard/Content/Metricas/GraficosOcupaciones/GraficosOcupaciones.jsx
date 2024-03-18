import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const App = () => {
  const ocupaciones = useSelector((state) => state.ocu.ocupaciones);
  const censados = useSelector((state) => state.perUsu.listaPersonasUsu);

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Cantidad Censados",
        data: [],
      },
    ],
  });

  useEffect(() => {
    let categories = [];
    let data = [];

    ocupaciones.forEach((d) => {
      const { id, ocupacion } = d;
      const totalPorOcu = contarTotalUsuariosPorOcupacion(id);
      if (totalPorOcu > 0) {
        categories.push(ocupacion);
        data.push(totalPorOcu);
      }
    });
    function contarTotalUsuariosPorOcupacion(id) {
      let contadorCensos = 0;
      censados.forEach((c) => {
        if (c.ocupacion === id) {
          contadorCensos++;
        }
      });
      return contadorCensos;
    }

    setChartData({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: categories,
        },
      },
      series: [
        {
          name: "Cantidad Censados",
          data: data,
        },
      ],
    });
  }, [ocupaciones,censados]);

  

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="700px"
          />
        </div>
      </div>
    </div>
  );
};

export default App;