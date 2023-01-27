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

export default function MenuBar({value, setValue, title, active, subtitle, setTitle, setActive, setSubtitle}) {
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState();
    const tkUser = localStorage.getItem('tk-user')

    async function fetchUser() {

        if (tkUser) {
            await api
                .get(`person`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(tkUser)}`,
                    },
                })
                .then(response => {
                    console.log(response)
                    setDataUser(response?.data.result);
                }
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
                    <div className={value == true && window.innerWidth > '600' ? '__menuBar' : value == false && window.innerWidth < 600 ? '__menuBarFull' : '__menuBar'}>
                        <div className="__divisionOptions">
                            <div className="__options">
                                <div className="__closeMenu">
                                    <AiOutlineClose onClick={() => setValue(false)} />
                                </div>
                                <div className="__logo">
                                    <img src={logo} alt="" onClick={() => navigate("/")} />
                                </div>

                                <div className="__nameUser">Olá {dataUser?.first_name}
                                    <br />Seu ID: {dataUser?.id}</div>
                            </div>
                            <div>
                                {SidebarData.map((item, index) => {
                                    return (
                                        <div key={index} className="__option">
                                            <Link to={item.path}>
                                                <div className={!menu ? "__linkOption" : "__linkOption disabled"} onClick={() => openDropDown(item)}>
                                                    <div className={active === item.title ? "__iconOption_active" : "__iconOption"}>
                                                        {item.icon}
                                                    </div>

                                                    <div className="__optionTitle">
                                                        {item.blocked ? <AiFillLock style={{ marginRight: '0.2rem' }} /> : ""} {item.title}

                                                    </div>
                                                </div>
                                                {item.dropdown == true && item.dropdownOpened == true && (
                                                    <ul className='__menu_ul' id={`__menu_ul${index}`}>
                                                        {item.dropdownItems.map((value, index) => {
                                                            return (
                                                                <Link to={value.url}>
                                                                    <li className='__menu_li' key={index + 1}>{value.title}</li>
                                                                </Link>
                                                            )
                                                        })}
                                                    </ul>
                                                )}
                                            </Link>
                                        </div>
                                    )
                                })}

                                <div className="__option">
                                    <div className={"__linkOption"} onClick={logout} >
                                        <div className="__iconOption">
                                            <BiLogOut />
                                        </div>

                                        <div className="__optionTitle">
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