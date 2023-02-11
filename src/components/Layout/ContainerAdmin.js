import Navbar from '../Navbar/Navbar'
import { useState, useEffect } from 'react'
import { getUserInfo, getUserOrder } from '../../pages/User/utils/apiFunctions'
import './index.css'
import { useNavigate, Navigate, Outlet } from 'react-router-dom'
import Loader from '../Loader/Loader'
import MenuBarAdmin from '../MenuBarAdmin'

function ContainerAdmin({ children }) {
    const navigate = useNavigate()
    const [title, setTitle] = useState('Dashboard')
    const [menu, setMenu] = useState(false)
    const [loadingAmbiente, setLoadingAmbiente] = useState(true)
    const [active, setActive] = useState('Dashboard')
    const [subtitle, setSubtitle] = useState('Painel administrativo')
    const [people, setPeople] = useState()
    const [value, setValue] = useState(false)
    const user = localStorage.getItem('tk-user')

    async function getUserAllInfo() {
        setLoadingAmbiente(true)

        try {
            let user = await getUserInfo()
            console.log(user)
            setPeople(user.data.result)
        } catch (err) {
            console.log(err)
        }

        setLoadingAmbiente(false)
    }

    useEffect(() => {
        getUserAllInfo()
    }, [])

    if (loadingAmbiente) return <Loader />
    return (
        <main className='container_user'>
            <aside className='aside_navbar'>
                <MenuBarAdmin
                    menu={menu}
                    value={value}
                    setValue={setValue}
                    people={people}
                    title={title}
                    subtitle={subtitle}
                    active={active}
                    setActive={setActive}
                    setSubtitle={setSubtitle} />
            </aside>

            <aside className='aside_user'>
                <Navbar
                    value={value}
                    setValue={setValue}
                    title={title}
                    subtitle={subtitle}
                    people={people}
                />
                <Outlet context={[people]} />
            </aside>
        </main>
    )
}

export default ContainerAdmin