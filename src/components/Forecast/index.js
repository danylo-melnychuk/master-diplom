import React from "react";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";

const generateData = () => {
  const months = Array.from({ length: 12 }, (_, i) =>
    DateTime.local(2024, i + 1, 1).toFormat("MMMM")
  );
  let data = months.map((month) => ({
    month,
    pollution: Math.random() * 100,
  }));
  return data;
};

const airData = generateData();
const waterData = generateData();
const radiationData = generateData();
const soilData = generateData();

const createChartData = (data, label, color) => ({
  labels: data.map((d) => d.month),
  datasets: [
    {
      label: label,
      data: data.map((d) => d.pollution),
      borderColor: color,
      backgroundColor: color.replace("1)", "0.2)"), // Зробити бекграунд прозорим
      fill: true,
    },
  ],
});

const Forecast = () => {
  return (
    <div style={{ width: "90%", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>AI prediction in Lviv 2025</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <h3>Забруднення повітря</h3>
          <Line data={createChartData(airData, "Повітря", "rgba(75, 192, 192, 1)")} />
        </div>
        <div>
          <h3>Забруднення води</h3>
          <Line data={createChartData(waterData, "Вода", "rgba(54, 162, 235, 1)")} />
        </div>
        <div>
          <h3>Радіаційне забруднення</h3>
          <Line data={createChartData(radiationData, "Радіація", "rgba(255, 99, 132, 1)")} />
        </div>
        <div>
          <h3>Забруднення ґрунту</h3>
          <Line data={createChartData(soilData, "Ґрунт", "rgba(153, 102, 255, 1)")} />
        </div>
      </div>
    </div>
  );
};

export default Forecast;
