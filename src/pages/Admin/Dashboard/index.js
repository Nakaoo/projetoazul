import React from "react"
import { useEffect, useState, useContext } from "react"
import { getPerson } from "../utils/apiFunctions"
import { useNavigate } from "react-router-dom"
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
    const [accountType, setAccountType] = useState('')
    const [menu, setMenu] = useState(false)
    const tkUser = localStorage.getItem('tk-user')
    const navigate = useNavigate();
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.month),
        datasets: [
            {
                label: "Contas aprovadas",
                data: Data.map((data) => data.approvedAccounts),
                backgroundColor: [
                    "#353535;",
                ],
            },
            {
                label: "Novas contas",
                data: Data.map((data) => data.newAccounts),
                backgroundColor: [
                    "#ecf0f1",
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


    async function getPersonConfig() {

        try {
            let person = await getPerson()

            if (person?.data.result.nivel != 20) {
                navigate('/dashboard')
            } else {

            }
        } catch (err) {
            navigate('/login')
        }
    }

    useEffect(() => {
        getPersonConfig()
    }, [])


    return (
            <div className="__admin_dashboard_content">
                <div className="__admin_dashboard_cards">
                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Total de indicações</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">5</span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                    </div>

                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações aprovadas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">8</span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                    </div>

                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações pendentes</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">3</span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                    </div>


                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Mensagens</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">40</span>
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
