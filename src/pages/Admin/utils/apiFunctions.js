import api from "../../../services/api";

export async function getPerson(){
    const person = await api.get('/person/config')

    return person;
}