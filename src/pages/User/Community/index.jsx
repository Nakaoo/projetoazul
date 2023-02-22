import './index.css'
import './index.scss'

// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from "react"
import { BsFillPersonFill } from 'react-icons/bs'
// import { useLocation } from "react-router-dom"
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
// import { BsCheck2Circle } from 'react-icons/bs'
// import { message } from "antd"
import { RiListSettingsFill } from 'react-icons/ri'
import graphic1 from '../../../assets/img/graphic-1.svg'
import graphic2 from '../../../assets/img/graphic-2.svg'
import viewMore from '../../../assets/img/viewMore.svg'
import { useOutletContext } from "react-router-dom"
import { getMultiNivel } from "../utils/apiFunctions"
import Card from "./components/Card"

const comunidade = function Community() {
  // eslint-disable-next-line
  const [accountType, people] = useOutletContext();
  // eslint-disable-next-line
  const [network, setNetword] = useState([])
  // const [setNetword, network] = useOutletContext([])


  // eslint-disable-next-line
  // const mult = await getMultiNivel();
  // setNetword(mult.data.result)

  // const [network] = useOutletContext();
  async function getNetwor() {
    const mult = await getMultiNivel();
    let data = mult.data.result;

    const trs = data.map(indic => {
      return (
        <tr className="__admin_dashboard_community_body_tr" key={indic.affiliate_id}>
          <td>{indic.name}</td>
          <td className='text-center'>{indic.email}</td>
          <td className='text-center'>{indic.phone}</td>
          <td className='text-center'>{indic.qtt}</td>
          <td className='text-center'>{indic.situacao === true ? 'Ativo' : 'Pendente'}</td>
        </tr>
      )
    })
    setNetword(trs)
  }
  // console.log('network', network);

  const callBackEffect = useCallback(async () => {
    await getNetwor();
  }, []);

  useEffect(() => {
    callBackEffect()
  }, [callBackEffect])

  // getNetwor();
  // console.log('network', network.data);

  return (
    <div className="user">
      <div className="community">
        <div className="content">
          <aside className="left">
            <div className="cards">
              <Card icon={<span className="icon"><BsFillPersonFill /></span>} title="Total de indicações" body={people?.indication?.total ? people?.indication?.total : 0} />
              <Card icon={<span className="icon"><BsFillPersonFill /></span>} title="Indicações aprovadas" body={people?.active?.active ? people?.active?.active : 0} />
              <Card icon={<span className="icon"><BsFillPersonFill /></span>} title="Indicações pendentes"
                body={people?.active?.active && people?.indication?.total ? people?.indication?.total - people?.active?.active : 0} />

              <Card icon={<span className="icon"><BsFillPersonFill /></span>} title="Novas mensagens" body="0" />
              <Card icon={<span className="icon"><BsFillPersonFill /></span>} title="Todas mensagens" body="0" />
              <Card icon={<span className="icon"><BsFillPersonFill /></span>} title="Bônus e cashback" body={`R$ ${people?.lockwallet?.balance}`} />
            </div>

            <div className="cards">
              <Card
                icon={<span className='icon_settings'>Filtrar <RiListSettingsFill /></span>}
                // title="Indicados"
                style={{ width: '100%' }}
                body={<table className="table">
                  <thead className="">
                    <tr className="">
                      <th>Nome</th>
                      <th className='text-center'>Email</th>
                      <th className='text-center'>Telefone</th>
                      <th className='text-center'>Cashback</th>
                      <th className='text-center'>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {network}
                  </tbody>
                </table>}
              />
            </div>
          </aside>
          <aside className="right">
            <div className="__cardRewards2">
              <div className="__rewards2">
                <div className="__rewardTitle">
                  Recompensas
                  <img src={viewMore} alt="" />
                </div>
                <h2></h2>
                <h3>Ultimos 30 dias</h3>
                <img src={graphic1} alt="" />
              </div>
              <div className="__incomeAmounts">
                Histórico de Recompensas
                <img src={graphic2} alt="" />
              </div>
            </div>
          </aside>
        </div >
      </div >
    </div >
  )
}

export default comunidade;