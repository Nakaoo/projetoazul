import "./index.scss"

import { useCallback, useEffect, useState } from "react"
import Card from "../../../components/Cards/Card"
import { getUserOrder } from '../utils/apiFunctions'
import { Button, Space, Table } from "antd";

export default (props) => {
    const [search, setSearch] = useState('')
    const [allOrder, setAllOrder] = useState([])

    async function getAllOrder() {
        let order = await getUserOrder()
        let newObj = order?.data?.result.map((e) => (
            {
                ...e,
                product: e?.items[0].product.name,
                price: e?.items[0].product.price,
                status_id: e.status_id
            }
        ))

        console.log(newObj)

        setAllOrder(newObj)
    }

    const callBackEffect = useCallback(async () => {
        await getAllOrder();
    }, []);

    useEffect(() => {
        callBackEffect()
    }, [callBackEffect])

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
            title: 'Produto',
            dataIndex: 'product',
            key: 'product',
            sorter: (a, b) => a.product - b.product,
            sortOrder: sortedInfo.product === 'price' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
            value: (val) => { return `${val.cdi * 1000}%` },
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.description === 'cdi' ? sortedInfo.description : null,
            ellipsis: true,
        },
        {
            title: 'Id Operação',
            dataIndex: 'uuid',
            key: 'uuid',
            sorter: (a, b) => a.uuid - b.uuid,
            sortOrder: sortedInfo.uuid === 'cdi' ? sortedInfo.uuid : null,
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status_id',
            key: 'status_id',
            sorter: (a, b) => a.status - b.status,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            ellipsis: true,
        }
    ];

    return (
        <>
            <Table 
            columns={columns} 
            dataSource={allOrder} 
            onChange={handleChange} 
            rowClassName="admin_prod_row"
            className="admin_prod_col"
            />
        </>
    )
}