import './index.css'
// eslint-disable-next-line
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Spin } from 'antd'
export default function Loader() {
    return (
        <div className='__loader_container'>
            <div className='__loader'>
                <Spin tip="Carregando..." size="large">
                </Spin>
            </div>
        </div>
    )
}