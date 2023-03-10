import api from "../../../services/api";

export async function getPerson(){
    const person = await api.get('/person/config')

    return person;
}

export async function getOrders(status){
    const orders = await api.get(`/financial/order?status_id=${status}`)

    return orders;
}

export async function getOrderDetails(id){
    const order = await api.get(`financial/order/${id}`)
    return order
}

export async function approveOrder(orderUuid){
    let orderItem = orderUuid;

    const order = await api.put(`/financial/payment/${orderItem}`)

    return order
}

export async function refusalOrder(orderUuid){
    let orderItem = orderUuid;

    const order = await api.put(`/financial/reject/${orderItem}`)

    return order
}
export async function getFinancial(status){
    const orders = await api.get(`/financial/withdrawal?status_id=${status}`)

    return orders;
}

export async function approveFinancial(orderUuid){
    let orderItem = orderUuid;

    const order = await api.put(`/financial/withdrawal/${orderItem}`)

    return order
}

export async function complianceActivation (orderUuid){
    let orderItem = orderUuid;

    const order = await api.put(`/compliance/activation/${orderItem}`)

    return order
}

export async function compliancePayment (orderUuid){
    let orderItem = orderUuid;

    const order = await api.put(`/compliance/payment/${orderItem}`)

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

export async function geProduto(){
    const producto = await api.get(`/admin/product`)

    return producto;
}

