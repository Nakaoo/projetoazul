import api from "../../../services/api";
import apitest from "../../../services/apitest";

export async function getUser(){
    const user = await api.get('/person')

    return user;
}

export async function getPerson(){
    const person = await api.get('/person/config')

    return person;
}

export async function getProducts(){
    const products = await api.get('/product')

    return products
}

export async function generateOrder(data){
    const order = await api.post(`/order`, data)

    return order;
}

export async function generatePix(uuid){
    const id = uuid;

    const pix = await api.post(`/payment/order/pix/${id}`)

    return pix;
}

export async function generateTed(uuid){
    const id = uuid;

    const pix = await api.post(`/payment/order/deposit/${id}`)

    return pix;     
}

export async function deleteOrder(uuid){
    const id = uuid;

    const order = await api.delete(`/order/${id}`)

    return order;
}

export async function getMultiNivel(){
    const multinivel = await api.get(`/multinivel`)


    return multinivel
}

export async function getMultiNivelTotal(){
    const multiniveltotal = await api.get(`/multiniveltotal`)

    return multiniveltotal;
}

export async function getUserInfo(){
    const user = await api.get('/user')

    return user;
}

export async function getUserOrder(){
    const order = await api.get('/order')

    return order;
}

export async function getWithdrawals(){
    const withdrawals = await api.get('/withdrawal')

    return withdrawals;
}