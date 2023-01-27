// components/BarChart.js
import { Bar } from "react-chartjs-2";
import './BarChart.css';

export const BarChart = ({ chartData, data }) => {
    return (
        <div className="chart-container">
            <div className="chart-header">
                <div className="chart-title">
                    <h4>Abertura de novas contas</h4>
                </div>
                <div className="chart-legendas">
                    <div className="chart-legenda">
                        <p className="chart-legenda-p"><div className="chart-legenda-new"></div>Novas contas</p>
                    </div>
                    <div className="chart-legenda">
                        <p className="chart-legenda-p"><div className="chart-legenda-approved"></div>Contas aprovadas</p>
                    </div>
                    <div className="chart-filtro">
                        <select className="chart-select">
                            {
                                chartData.labels.map((val) => {
                                    return (
                                        <option key={val + 1}>{val}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                </div>
            </div>
            <div className="chart-barchart">
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        responsive: true,
                        scales: {
                            x: {
                                stacked: true,
                            },
                        },
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    );
};