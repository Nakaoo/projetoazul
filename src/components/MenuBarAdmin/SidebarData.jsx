import { AiFillDashboard, AiFillSignal, AiFillShop, AiFillShopping, AiOutlineWechat } from 'react-icons/ai'
import { MdPeople, MdOutlinePayment } from 'react-icons/md'
import {FiSettings} from 'react-icons/fi'

export const SidebarData = [
    {
        title: 'Dashboard', 
        path: '/admin/dashboard',
        subtitle: 'Painel administrativo',
        icon: <AiFillDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Financeiro', 
        icon: <AiFillSignal />,
        cName: 'nav-text',
        dropdown: true,
        dropdownOpened: false,
        dropdownItems: [
            {
                title: 'Financeiro',
                dropdownTitle: 'Pendentes',
                subtitle: 'Saques pendentes',
                url: '/admin/finance?=pending'
            },
            {
                title: 'Financeiro',
                dropdownTitle: 'Aprovados',
                subtitle: 'Saques aprovados',
                url: '/admin/finance?=historic'
            }
        ]
    },
    {
        title: 'Compliance', 
        icon: <AiFillShop />,
        cName: 'nav-text',
        dropdown: true,
        dropdownOpened: false,
        dropdownItems: [
            {
                title: 'Compliance',
                dropdownTitle: 'Aprovados',
                subtitle: 'Pedidos aprovados',
                url: '/admin/compliance?=approved'
            },
            {
                title: 'Compliance',
                dropdownTitle: 'Pendentes',
                subtitle: 'Pedidos pendentes',
                url: '/admin/compliance?=pending'
            },
            {
                title: 'Compliance',
                dropdownTitle: 'Recusados',
                subtitle: 'Pedidos recusados',
                url: '/admin/compliance?=refused'
            },
        ]
    },
    {
        title: 'Produtos', 
        icon: <AiFillShopping />,
        cName: 'nav-text',
        path: '/admin/produto'
        // blocked: true
    },
    {
        title: 'Usuários', 
        icon: <MdPeople />,
        cName: 'nav-text',
        blocked: true
    },
    {
        title: 'Mensagens', 
        icon: <AiOutlineWechat />,
        cName: 'nav-text',
        blocked: true
    },
    {
        title: 'Indicados', 
        icon: <MdOutlinePayment />,
        cName: 'nav-text',
        blocked: true
    },
    {
        title: 'Configurações', 
        icon: <FiSettings />,
        cName: 'nav-text',
        blocked: true
    },
]