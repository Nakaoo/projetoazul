import MenuBar from '../MenuBar'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect } from 'react'
import { getUserInfo, getUserOrder } from '../../pages/User/utils/apiFunctions'
import './index.css'
import { useNavigate, Navigate, Outlet } from 'react-router-dom'
import Loader from '../Loader/Loader'


function ContainerUser({ children }) {
    const navigate = useNavigate()
    const [title, setTitle] = useState('Dashboard')
    const [menu, setMenu] = useState(false)
    const [loadingAmbiente, setLoadingAmbiente] = useState(true)
    const [active, setActive] = useState('Dashboard')
    const [subtitle, setSubtitle] = useState('Painel de controle')
    const [accountType, setAccountType] = useState('valido')
    const [people, setPeople] = useState()
    const [value, setValue] = useState(false)
    const user = localStorage.getItem('tk-user')

    async function getUserAllInfo() {
        setLoadingAmbiente(true)

        try {
            let user = await getUserInfo()
            let order = await getUserOrder()
            setPeople(user.data.result)
            if (order.data.result.data.length > 0 && order.data.result.data[0].status_id == 3) {
                setMenu(true)
                setAccountType('pagamento')
            } else if (user.data.result.user.person.is_active < 1) {
                setMenu(true)
                setAccountType('invalido')
            }else{
                setAccountType('valido')
            }
        } catch (err) {
            console.log(err)
        }

        setLoadingAmbiente(false)
    }

    useEffect(() => {
        getUserAllInfo()
    }, [accountType])

    if (loadingAmbiente) return <Loader />
    return (
        <main className='container_user'>
            <aside className='aside_navbar'>
                <MenuBar
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
                <Outlet context={[accountType, people]} />
            </aside>
        </main>
    )
}

export default ContainerUser