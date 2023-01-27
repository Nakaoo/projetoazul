import { IoIosNotificationsOutline } from 'react-icons/io'
import './Navbar.css'
import { HiMenu } from "react-icons/hi"
import { useContext } from 'react'
import { UserContext } from '../../hooks/UserContext'

export default function Navbar({ title, subtitle, value, setValue }) {

    return (
        <div className="__navbar">
            <div className='__navbar_content'>
                <div className="__navbar_header">
                    <span className="__navbar_title">{title}</span>
                    <span className="__navbar_subtitle">{subtitle}</span>
                </div>
                <div className="__navbar_notifications">
                    <IoIosNotificationsOutline className='__navbar_notifications_icon' />
                    {window.innerWidth < 600 && (
                        <HiMenu className='__icon_navbar' onClick={() => setValue(true)} />
                    )}
                </div>
            </div>
        </div>
    )
}