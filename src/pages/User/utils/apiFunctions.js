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
