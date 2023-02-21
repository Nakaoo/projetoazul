import './index.css'
import React from "react"
// eslint-disable-next-line
import { useEffect, useState, useContext } from "react"
// eslint-disable-next-line
import { getPerson, getMultiNivel, getMultiNivelTotal } from "../utils/apiFunctions"
import { useNavigate, useOutletContext } from "react-router-dom"
// eslint-disable-next-line
import MenuBarAdmin from "../../../components/MenuBarAdmin"
// eslint-disable-next-line
import { HiMenu } from "react-icons/hi"
// eslint-disable-next-line
import { UserContext } from "../../../hooks/UserContext"
// eslint-disable-next-line
import Navbar from "../../../components/Navbar/Navbar"
import { Data } from "../utils/data"
import { PieData } from "../utils/piedata"
import { BarChart } from "../components/BarChart"
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import CommunityTable from "../components/CommunityTable"
import PieChart from "../components/PieChart"
import { BsFillPersonFill } from 'react-icons/bs'

export default function AdminDashboard() {
    const [people] = useOutletContext()
    // eslint-disable-next-line
    const [months, setMonths] = useState([{}])
    const [approvedAccounts, setApprovedAccounts] = useState([])
    // eslint-disable-next-line
    const [pendingAccounts, setPendingAccounts] = useState([{}])
    const [dataApi, setDataApi] = useState([])

    useEffect(() => {
        // eslint-disable-next-line
        people.active_month.map((data, index) => {
            if (data.active === 0) {
                setDataApi([{ ...dataApi, data }])
            }
            if (data.active === 1) {
                setApprovedAccounts([{ ...approvedAccounts, data }])
            }
        })
        console.log(dataApi)
        console.log(approvedAccounts)
    }, [])
    // eslint-disable-next-line
    const tkUser = localStorage.getItem('tk-user')
    // eslint-disable-next-line
    const navigate = useNavigate();
    // eslint-disable-next-line
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

    // eslint-disable-next-line
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

    // eslint-disable-next-line
    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    return (
        <div className="__admin_dashboard_content">
            <div className="__admin_dashboard_cards">
                <div className="__admin_dashboard_card">
                    <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Total de indicações</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                    <span className="__admin_dashboard_card_value">{(people?.active[0]?.count + people?.active[1]?.count) > 0 ? people?.active[0]?.count + people?.active[1]?.count : 0}</span>
                    <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                </div>

                <div className="__admin_dashboard_card">
                    <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações aprovadas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                    <span className="__admin_dashboard_card_value">{people?.active[0]?.count}</span>
                    <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                </div>

                <div className="__admin_dashboard_card">
                    <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações pendentes</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                    <span className="__admin_dashboard_card_value">{people?.active[1]?.count ? people?.active[1]?.count : "0"}</span>
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
