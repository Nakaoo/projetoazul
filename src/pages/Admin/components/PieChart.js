// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import './PieChart.css'

function PieChart({ chartData }) {
  return (
    <><div className="chart-container-header">
        <h4>Informação</h4>
      </div><div className="chart-container-pie">
              <Pie
                  data={chartData}
                  options={{
                      plugins: {
                          maintainAspectRatio: false,
                          legend: {
                              display: false
                          }
                      }
                  }} />
          </div></>
  );
}
export default PieChart;