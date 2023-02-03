import MenuBar from '../MenuBar'
import Navbar from '../Navbar/Navbar'
import { useState } from 'react'
import './index.css'
import { useNavigate, Navigate, Outlet } from 'react-router-dom'

function ContainerUser({ children }) {
    const [title, setTitle] = useState('Dashboard')
    const [active, setActive] = useState('Dashboard')
    const [subtitle, setSubtitle] = useState('Painel de controle')
    const [value, setValue] = useState(false)
    const user = localStorage.getItem('tk-user')

    return (
        <main className='container_user'>
            <aside className='aside_navbar'>
                <MenuBar
                    value={value}
                    setValue={setValue}
                    title={title}
                    subtitle={subtitle}
                    active={active}
                    setActive={setActive}
                    setSubtitle={setSubtitle} />
            </aside>

            <aside className='aside_user'>
                <Navbar value={value} setValue={setValue} title={title} subtitle={subtitle} />
                <Outlet />
            </aside>
        </main>
    )
}

export default ContainerUser