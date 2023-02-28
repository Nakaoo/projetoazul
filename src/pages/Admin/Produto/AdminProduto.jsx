import './AdminProduto.css'
import { useState, useEffect, useCallback } from "react"
import { geProduto } from "../utils/apiFunctions"
import { Button, Space, Table } from "antd";

export default _ => {
    const [produto, setProduto] = useState([])

    const getAllProduct = async () => {
        let prod = await geProduto()
        let newObj = prod?.data?.result.map((e) => (
            {
                ...e,
                price: "R$ " + e.price,
                cdi: (e.cdi * 100).toFixed(2) + "%",
                commission: e.commission + "%",
                is_active: e.is_active === 1 ? "Ativo" : "Desativado"
            }
        ))

        setProduto(newObj)
    }

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };


    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const columns = [
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'CDI',
            dataIndex: 'cdi',
            key: 'cdi',
            value: (val) => { return `${val.cdi * 1000}%` },
            sorter: (a, b) => a.cdi - b.cdi,
            sortOrder: sortedInfo.columnKey === 'cdi' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Comissão',
            dataIndex: 'commission',
            key: 'commission',
            value: (a) => a.commission * 100,
            sorter: (a, b) => a.commission - b.commission,
            sortOrder: sortedInfo.columnKey === 'cdi' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Situacao',
            dataIndex: 'is_active',
            key: 'is_active',
            sorter: (a, b) => a.is_active - b.is_active,
            sortOrder: sortedInfo.columnKey === 'is_active' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];

    // console.log('prod', produto);
    const callBackEffect = useCallback(async () => {
        await getAllProduct();
    }, []);

    useEffect(() => {
        callBackEffect()
    }, [callBackEffect])

    return (
        <>
            <Table 
            columns={columns} 
            dataSource={produto} 
            onChange={handleChange} 
            rowClassName="admin_prod_row"
            className="admin_prod_col"
            />
        </>
    )
}