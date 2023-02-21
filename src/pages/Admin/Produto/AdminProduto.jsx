import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminProduto.css'

import { useState, useEffect, useCallback } from "react"
import { geProduto } from "../utils/apiFunctions"

export default _ => {
    const [produto, setProduto] = useState([])
    const getAllProduct = async () => {
        let prod = await geProduto()
        setProduto(prod.data.result)
    }

    console.log('prod', produto);
    const callBackEffect = useCallback(async () => {
        await getAllProduct();
    }, []);

    useEffect(() => {
        callBackEffect()
    }, [callBackEffect])

    return (
        <div className="container">
            <div className='border border-primary p-3 mt-3 rounded'>
                <div className="row text-light">
                    <div className="col-lg-12">
                        <h2>Lista de produtos</h2>
                    </div>
                    <div className="col-lg-12">
                        <table className="table  text-light">
                            <thead>
                                <th>Id</th>
                                <th>Nome</th>
                                <th className='text-end'>Preço</th>
                                <th className='text-end'>CDI</th>
                                <th className='text-end'>Comissão</th>
                                <th className='text-center'>Categoria</th>
                                <th className='text-center'>Ativo</th>
                                <th className='text-end'>Ação</th>
                            </thead>
                            <tbody>
                                {produto.map(prod => {
                                    const vl = prod.cdi * 100;
                                    const cm = prod.commission * 100;
                                    console.log('cm', cm);
                                    return (
                                        <tr key={prod.uuid}>
                                            <td>{prod.uuid.substring(1, 8)}</td>
                                            <td>{prod.name}</td>
                                            <td className='text-end'>{prod.price}</td>
                                            <td className='text-end'>{vl.toFixed(2)}%</td>
                                            <td className='text-end'>{cm.toFixed(2)}%</td>
                                            <td className='text-center'>{prod.category?.name}</td>
                                            <td className='text-center'>{prod.is_active === 1 ? 'Sim' : 'Não'}</td>
                                            <td className='text-end'>
                                                <button className='btn btn-outline-info mx-1'>Editar</button>
                                                <button className='btn btn-outline-danger mx-1'>Apagar</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}