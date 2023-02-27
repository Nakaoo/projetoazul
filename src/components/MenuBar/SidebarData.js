import { AiFillDashboard, AiFillSignal, AiFillShop, AiFillShopping, AiOutlineWechat } from 'react-icons/ai'
import { MdPeople, MdOutlinePayment } from 'react-icons/md'
import { FiSettings } from 'react-icons/fi'

export const SidebarData = [
    {
        title: 'Dashboard',
        subtitle: 'Painel de controle',
        path: '/dashboard',
        icon: <AiFillDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Financeiro',
        subtitle: 'Painel financeiro',
        path: '/financeiro',
        icon: <AiFillSignal />,
        cName: 'nav-text'
    },
    {
        title: 'Pedidos',
        icon: <AiFillShop />,
        subtitle: 'Controle de pedidos',
        path: '/order',
    },
    {
        title: 'Produtos',
        subtitle: 'Controle de produtos',
        icon: <AiFillShopping />,
        cName: 'nav-text',
        blocked: true
    },
    {
        title: 'Indicados',
        subtitle: 'Painel de Indicados',
        path: '/community',
        icon: <MdPeople />,
        cName: 'nav-text',

    },
    {
        title: 'Mensagens',
        icon: <AiOutlineWechat />,
        cName: 'nav-text',
        blocked: true
    },
    {
        title: 'Pagamentos',
        icon: <MdOutlinePayment />,
        cName: 'nav-text',
        blocked: true
    },
    {
        title: 'Configurações',
        subtitle: 'Gerencie a sua conta',
        path: '/configurations',
        blocked: true,
        icon: <FiSettings />,
        cName: 'nav-text'
    },
]