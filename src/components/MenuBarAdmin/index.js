import './index.css'
import icon_9 from '../../assets/img/Icon-9.svg'
import logo from '../../assets/img/logo_myhart_secundario.png'
import { SidebarData } from './SidebarData'
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { HiMenu } from "react-icons/hi"
import api from '../../services/api';
import { AiOutlineClose } from "react-icons/ai"
import { UserContext } from '../../hooks/UserContext'
import { useContext } from "react"
import { BiLogOut } from 'react-icons/bi'
import { AiFillLock } from 'react-icons/ai'
import { globalImg } from '../../utils/globalImg';

export default function MenuBarAdmin({ value, setValue, title, active, subtitle, setTitle, setActive, setSubtitle }) {
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState();
    const tkUser = localStorage.getItem('tk-user')
    let logo = globalImg.logo

    async function fetchUser() {

        if (tkUser) {
            await api
            .get(`person/config`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(tkUser)}`,
                },
            })
            .then(response => {
                if(response?.data.result.purchase_active < 1){
                    setMenu(true)
                    console.log(menu)
                }}
            )

            await api
                .get(`person`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(tkUser)}`,
                    },
                })
                .then(response => {
                    console.log(response)
                    setDataUser(response?.data.result);

                    if(response?.data.result.purchase_active < 1){
                        setMenu(true)
                    }}
                )
            
        }
        else {
            navigate('/login')
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    async function logout() {
        let tkUser = localStorage.getItem('tk-user')

        if (tkUser) {
            navigate('/login')
            localStorage.removeItem('tk-user')
        } else return 0;
    }

    function openDropDown(item) {
        if (item.dropdownOpened == false) {
            item.dropdownOpened = true
        } else if (item.dropdownOpened == true) {
            item.dropdownOpened = false
        }
    }

    return (
        <>
            {value == false && window.innerWidth <= '600' ? (
                <>

                </>
            ) :
                (
                    <div className={value == true && window.innerWidth > '600' ? '__admin_menuBar' : value == false && window.innerWidth < 600 ? '__admin_menuBarFull' : '__admin_menuBar'}>
                        <div className="__admin_divisionOptions">
                            <div className="__admin_options">
                                <div className="__admin_closeMenu">
                                    <AiOutlineClose onClick={() => setValue(false)} />
                                </div>
                                <div className="__admin_logo">
                                    <img src={logo} alt="" onClick={() => navigate("/")} />
                                </div>

                                <div className='__admin_info'>
                                    <div className="__admin_nameUser">Olá <span className='__admin_highlight'>{dataUser?.first_name}</span></div>
                                    <div className="__admin_nameUser">Seu ID: <span className='__admin_highlight'>{dataUser?.id}</span> </div>
                                </div>  
                            </div>
                            <div>
                                {SidebarData.map((item, index) => {
                                    return (
                                        <div key={index} className="__admin_option">
                                            <Link to={item.path}>
                                                <div className={!item.blocked ? "__admin_linkOption" : "__admin_linkOption disabled"} onClick={() => openDropDown(item)}>
                                                    <div className={active === item.title ? "__admin_iconOption_active" : "__admin_iconOption"}>
                                                        {item.icon}
                                                    </div>

                                                    <div className="__admin_optionTitle">
                                                        {item.blocked ? <AiFillLock style={{ marginRight: '0.2rem' }} /> : ""} {item.title}

                                                    </div>
                                                </div>
                                                {item.dropdown == true && item.dropdownOpened == true && (
                                                    <ul className='__admin_menu_ul' id={`__admin_menu_ul${index}`}>
                                                        {item.dropdownItems.map((value, index) => {
                                                            return (
                                                                <Link to={value.url}>
                                                                    <li className='__admin_menu_li' key={index + 1}>{value.title}</li>
                                                                </Link>
                                                            )
                                                        })}
                                                    </ul>
                                                )}
                                            </Link>
                                        </div>
                                    )
                                })}

                                <div className="__admin_option">
                                    <div className={"__admin_linkOption"} onClick={logout} >
                                        <div className="__admin_iconOption">
                                            <BiLogOut />
                                        </div>

                                        <div className="__admin_optionTitle">
                                            Sair
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}