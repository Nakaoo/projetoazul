import React from "react"
import { useEffect, useState, useContext } from "react"
import { getPerson, getMultiNivel, getMultiNivelTotal } from "../utils/apiFunctions"
import { useNavigate, useOutletContext } from "react-router-dom"
import MenuBarAdmin from "../../../components/MenuBarAdmin"
import { HiMenu } from "react-icons/hi"
import { UserContext } from "../../../hooks/UserContext"
import './index.css'
import { Data } from "../utils/data"
import { PieData } from "../utils/piedata"
import { BarChart } from "../components/BarChart"
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import CommunityTable from "../components/CommunityTable"
import PieChart from "../components/PieChart"
import Navbar from "../../../components/Navbar/Navbar"
import { BsFillPersonFill } from 'react-icons/bs'

export default function AdminDashboard() {
    const [people] = useOutletContext()
    const [months, setMonths] = useState([{}])
    const [approvedAccounts, setApprovedAccounts] = useState([])
    const [pendingAccounts, setPendingAccounts] = useState([{}])
    const [dataApi, setDataApi] = useState([])

    useEffect(() => {
        
        people.active_month.map((data, index) => {
            if(data.active === 0){
                setDataApi([{...dataApi, data}])
            }
            if(data.active === 1){
                setApprovedAccounts([{...approvedAccounts, data}])
            }
        })
        console.log(dataApi)
        console.log(approvedAccounts)
    }, [])

    const tkUser = localStorage.getItem('tk-user')
    const navigate = useNavigate();
    const [chartData, setChartData] = useState({
        labels: dataApi?.map((data) => data.month),
        datasets: [
            {
                label: "Contas aprovadas",
                data: dataApi?.map((data) => data.data.count),
                backgroundColor: [
                    "white",
                ]
            },
            {
                label: "Novas contas",
                data: dataApi?.map((data) => data.accounts),
                backgroundColor: [
                    "#0C26AD",
                ],
            }
        ],
    });
    const [chartDataPie, setChartDataPie] = useState({
        datasets: [
            {
                label: "Contas aprovadas",
                data: PieData.map((data) => data.newAccounts),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
            }
        ]
    })
    Chart.register(CategoryScale);

    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    return (
        <div className="__admin_dashboard_content">
            <div className="__admin_dashboard_cards">
                <div className="__admin_dashboard_card">
                    <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Total de indicações</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                    <span className="__admin_dashboard_card_value">{people.active[0].count + people.active[1].count}</span>
                    <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                </div>

                <div className="__admin_dashboard_card">
                    <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações aprovadas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                    <span className="__admin_dashboard_card_value">{people.active[0].count}</span>
                    <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                </div>

                <div className="__admin_dashboard_card">
                    <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações pendentes</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                    <span className="__admin_dashboard_card_value">{people.active[1].count}</span>
                    <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                </div>


                <div className="__admin_dashboard_card">
                    <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Mensagens</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                    <span className="__admin_dashboard_card_value">0</span>
                    <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                </div>
            </div>

            <div className="__admin_dashboard_barchart">
                <BarChart chartData={chartData} data={Data} />
            </div>

            <div className="__admin_dashboard_end">
                <div className="__admin_dashboard_community">
                    <CommunityTable />
                </div>

                <div className="__admin_dashboard_information">
                    <PieChart chartData={chartDataPie} />
                </div>
            </div>
        </div>
    )
}
