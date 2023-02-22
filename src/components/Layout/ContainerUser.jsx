import MenuBar from '../MenuBar'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect, useCallback } from 'react'
import { getUserInfo, getUserOrder } from '../../pages/User/utils/apiFunctions'
import './index.css'
// eslint-disable-next-line
import { useNavigate, Navigate, Outlet } from 'react-router-dom'
import Loader from '../Loader/Loader'


// eslint-disable-next-line
function ContainerUser({ children }) {
    // eslint-disable-next-line
    const navigate = useNavigate()
    const [title, setTitle] = useState('Dashboard')
    const [menu, setMenu] = useState(false)
    const [loadingAmbiente, setLoadingAmbiente] = useState(true)
    const [active, setActive] = useState('Dashboard')
    const [subtitle, setSubtitle] = useState('Painel de controle')
    const [accountType, setAccountType] = useState('valido')
    const [people, setPeople] = useState()
    const [value, setValue] = useState(false)
    // eslint-disable-next-line
    const user = localStorage.getItem('tk-user')

    async function getUserAllInfo() {
        setLoadingAmbiente(true)

        try {
            let user = await getUserInfo()
            let order = await getUserOrder()
            setPeople(user.data.result)
            if (order.data.result.length > 0 && order.data.result[0].status_id === 3) {
                setMenu(true)
                setAccountType('pagamento')
            } else if (user.data.result.user.person.is_active < 1) {
                setMenu(true)
                setAccountType('invalido')
            } else {
                setAccountType('valido')
            }
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
                <>
                    <MenuBar
                        menu={menu}
                        value={value}
                        setValue={setValue}
                        people={people}
                        title={title}
                        subtitle={subtitle}
                        setTitle={setTitle}
                        active={active}
                        setActive={setActive}
                        setSubtitle={setSubtitle} />
                </>
            </aside>

            <aside className='aside_user'>
                <>
                    <Navbar
                        value={value}
                        setValue={setValue}
                        title={title}
                        subtitle={subtitle}
                        people={people}
                    />
                    <Outlet context={[accountType, people]} />
                </>
            </aside>
        </main>
    )
}

export default ContainerUser