import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const App = () => {
  const departamentos = useSelector((state) => state.depa.departamentos);
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

    departamentos.forEach((d) => {
      const { id, nombre } = d;
      const totalPorDpto = contarTotalUsuariosPorDptoId(id);
      if (totalPorDpto > 0) {
        categories.push(nombre);
        data.push(totalPorDpto);
      }
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
  }, [censados,departamentos]);

  

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