import api from "../../../services/api";

export async function getPerson(){
    const person = await api.get('/person/config')

    return person;
}

export async function getOrders(status){
    const orders = await api.get(`/financial/order?status_id=${status}`)

    return orders;
}

export async function approveOrder(orderUuid){
    let orderItem = order;

    const order = await api.post(`/financial/payment/${orderItem}`)

    return order
}

export async function getMultiNivel(){
    const multinivel = await api.get(`/multinivel`)


    return multinivel
}

export async function getMultiNivelTotal(){
    const multiniveltotal = await api.get(`/multiniveltotal`)

    return multiniveltotal;
}


export async function getMessageTotal(){
    const message = await api.get(`/message`)

    return message;
}

