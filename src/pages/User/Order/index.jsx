import "./index.scss"

import { useCallback, useEffect, useState } from "react"
import Card from "../../../components/Cards/Card"
import { getUserOrder } from '../utils/apiFunctions'

export default (props) => {
    const [search, setSearch] = useState('')
    const [allOrder, setAllOrder] = useState([])

    async function getAllOrder() {
        let order = await getUserOrder()
        // console.log('order', order);
        // console.log()
        setAllOrder(order.data.result)
    }

    const callBackEffect = useCallback(async () => {
        await getAllOrder();
    }, []);

    useEffect(() => {
        callBackEffect()
    }, [callBackEffect])


    return (
        <div className="user mt-3">
            <div className="message">
                <div className="content pe-3">
                    <div className="cards">
                        <Card className="w-100" bClassName="text-start" >
                            <input className="form-control text-light bg-transparent"
                                type="text"
                                value={search}
                                placeholder="Digite para Procurar..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="text-light">
                                {search}
                            </div>
                        </Card>
                    </div>
                    <div className="cards">
                        <Card className="w-100" bClassName="text-start" >
                            <table className="table text-light">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" name="" id="" /></th>
                                        <th>Produto</th>
                                        <th>Descrição</th>
                                        <th>N. Operação</th>
                                        <th className="text-end">Valor</th>
                                        <th>Situação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log('allOrder', allOrder)}
                                    {allOrder ? allOrder?.map(item => {
                                        return item.items.map(prod => {
                                            console.log('prod', item);
                                            if (prod.product.name != 'Ativação') {
                                                let status = ''
                                                switch (item.status_id) {
                                                    case 1:
                                                        status = 'Pendente'
                                                        break;
                                                    case 2:
                                                        status = 'Cancelado'
                                                        break;
                                                    case 3:
                                                        status = 'Pendente de pagamento'
                                                        break;
                                                    case 4:
                                                        status = 'Pago'
                                                        break;
                                                    case 5:
                                                        status = 'Em rota'
                                                        break;
                                                    case 6:
                                                        status = 'Concluido'
                                                        break;
                                                    case 7:
                                                        status = 'Rejeitado'
                                                        break;
                                                    case 8:
                                                        status = 'Entregue'
                                                        break;
                                                }
                                                return (
                                                    <tr key={item.uuid}>
                                                        <td><input type="checkbox" name="" id="" /></td>
                                                        <td>{prod.product.name}</td>
                                                        <td>{item.is_update === 1 ? 'Upgrade de Conta' : 'Abertura de Conta'}</td>
                                                        <td>{item.uuid}</td>
                                                        <td className="text-end">R$ {item.amount}</td>
                                                        <td>{status}</td>
                                                    </tr>)
                                            }
                                        })
                                    }) : <tr></tr>
                                    }
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}