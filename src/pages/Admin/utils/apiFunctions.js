import api from "../../../services/api";

export async function getPerson(){
    const person = await api.get('/person/config')

    return person;
}

export async function getOrders(){
    const person = await api.get('/person/config')

    return person;
}