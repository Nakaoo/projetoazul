import './index.css'
// eslint-disable-next-line
import icon_9 from '../../assets/img/Icon-9.svg'
// eslint-disable-next-line
import logo from '../../assets/img/logo_myhart_secundario.png'
import { SidebarData } from './SidebarData'
import * as React from "react";
// eslint-disable-next-line
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line
import { HiMenu } from "react-icons/hi"
// eslint-disable-next-line
import api from '../../services/api';
import { AiOutlineClose } from "react-icons/ai"
// eslint-disable-next-line
import { UserContext } from '../../hooks/UserContext'
// eslint-disable-next-line
import { useContext } from "react"
import { BiLogOut } from 'react-icons/bi'
import { AiFillLock } from 'react-icons/ai'
import { globalImg } from '../../utils/globalImg';

export default function MenuBar({ people, menu, setMenu, value, setValue, title, active, subtitle, setTitle, setActive, setSubtitle }) {
    const navigate = useNavigate();
    let logo = globalImg.logo

    async function logout() {
        let tkUser = localStorage.getItem('tk-user')

        if (tkUser) {
            navigate('/login')
            localStorage.removeItem('tk-user')
        } else return 0;
    }

    function openDropDown(item) {
        if (item.dropdownOpened === false) {
            item.dropdownOpened = true
        } else if (item.dropdownOpened === true) {
            item.dropdownOpened = false
        }
    }

    function handleNavigation(item){
        console.log(item)
        if(!menu && !item.blocked){
            navigate(item.path)
            setActive(item.title)
            setTitle(item.title)
            setSubtitle(item.subtitle)
        }else{
            return;
        }
    }

    return (
        <>
            {value === false && window.innerWidth <= '600' ? (
                <>

                </>
            ) :
                (
                    <div className={value === true && window.innerWidth > '600' ? '__menu_menuBar' : value === false && window.innerWidth < 600 ? '__menu_menuBarFull' : '__menu_menuBar'}>
                        <div className="__menu_divisionOptions">
                            <div className="__menu_options">
                                <div className="__menu_closeMenu">
                                    <AiOutlineClose onClick={() => setValue(false)} />
                                </div>
                                <div className="__menu_logo">
                                    <img src={logo} alt="" onClick={() => navigate("/dashboard")} />
                                </div>

                                <div className='__menu_info'>
                                    <div className="__menu_nameUser">Olá, <span className='__menu_highlight'>{people?.user.person.first_name}</span></div>
                                    <div className="__menu_nameUser">Seu ID: <span className='__menu_highlight'>{people?.user.person.id}</span> </div>
                                </div>
                            </div>
                            <div>
                                {SidebarData.map((item, index) => {
                                    return (
                                        <div key={index} className="__menu_option" onClick={() => handleNavigation(item)}>
                                            <div className={!menu ? "__menu_linkOption" : "__menu_linkOption disabled"} onClick={() => openDropDown(item)}>
                                                <div className={active === item.title ? "__menu_iconOption_active" : "__menu_iconOption"}>
                                                    {item.icon}
                                                </div>

                                                <div className="__menu_optionTitle">
                                                    {item.blocked ? <AiFillLock style={{ marginRight: '0.2rem' }} /> : menu ? <AiFillLock style={{ marginRight: '0.2rem' }} /> : ""} {item.title}

                                                </div>
                                            </div>
                                            {item.dropdown === true && item.dropdownOpened === true && (
                                                <ul className='__menu_menu_ul' id={`__menu_menu_ul${index}`}>
                                                    {item.dropdownItems.map((value, index) => {
                                                        return (
                                                            <Link to={value.url}>
                                                                <li className='__menu_menu_li' key={index + 1}>{value.title}</li>
                                                            </Link>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                    )
                                })}

                                <div className="__menu_option">
                                    <div className={"__menu_linkOption"} onClick={logout} >
                                        <div className="__menu_iconOption">
                                            <BiLogOut />
                                        </div>

                                        <div className="__menu_optionTitle">
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