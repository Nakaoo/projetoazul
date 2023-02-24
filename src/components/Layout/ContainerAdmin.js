import './index.css'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect, useCallback } from 'react'
import { getAdminInfo } from '../../pages/User/utils/apiFunctions'
// eslint-disable-next-line
import { useNavigate, Navigate, Outlet } from 'react-router-dom'
import Loader from '../Loader/Loader'
import MenuBarAdmin from '../MenuBarAdmin'

// eslint-disable-next-line
function ContainerAdmin({ children }) {
    // eslint-disable-next-line
    const navigate = useNavigate()
    const [title, setTitle] = useState('Dashboard')
    // eslint-disable-next-line
    const [menu, setMenu] = useState(false)
    const [loadingAmbiente, setLoadingAmbiente] = useState(true)
    const [active, setActive] = useState()
    const [subtitle, setSubtitle] = useState('Painel administrativo')
    const [people, setPeople] = useState()
    const [value, setValue] = useState(false)
    // eslint-disable-next-line
    const user = localStorage.getItem('tk-user')

    async function getUserAllInfo() {
        setLoadingAmbiente(true)

        try {
            let admin = await getAdminInfo()

            setPeople(admin.data.result)
        } catch (err) {
            console.log(err)
        }

        setLoadingAmbiente(false)
    }
    
    const callBackEffect = useCallback(async () => {
        await getUserAllInfo();
    }, []);

    useEffect(() => {
        callBackEffect();
    }, [callBackEffect])

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
                    setTitle={setTitle}
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