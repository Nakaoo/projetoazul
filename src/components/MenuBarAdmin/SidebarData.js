import { AiFillDashboard, AiFillSignal, AiFillShop, AiFillShopping, AiOutlineWechat } from 'react-icons/ai'
import { MdPeople, MdOutlinePayment } from 'react-icons/md'
import { BsStars } from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export const SidebarData = [
    {
        title: 'Dashboard', 
        path: '/admin/dashboard',
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
                title: 'Pendentes',
                url: '/admin/finance?=pending'
            },
            {
                title: 'Histórico',
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
                title: 'Aprovadas',
                url: '/admin/compliance?=approved'
            },
            {
                title: 'Pendentes',
                url: '/admin/compliance?=pending'
            },
            {
                title: 'Recusadas',
                url: '/admin/compliance?=refused'
            },
        ]
    },
    {
        title: 'Produtos', 
        icon: <AiFillShopping />,
        cName: 'nav-text',
        blocked: true
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
        title: 'Comunidades', 
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