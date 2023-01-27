import api from '../../../../services/api'

export async function getUserByCpf(arg){
    let {cpf} = arg 
    const user = await api.get(`/getcpf/${cpf}`)

    return user
}

export async function getUserByEmail(arg){
    let {email} = arg 
    const user = await api.get(`/getemail/${email}`)

    return user
}

export async function getUserByLogin(arg){
    let {login} = arg 
    const user = await api.get(`/getlogin/${login}`)

    return user
}

export async function getUserByPhone(arg){
    let {phone} = arg 
    const user = await api.get(`/getphone/${phone}`)

    return user
}

export async function createAccount(data){
    const create = await api.post(`/register`, data)

    return create
}

export async function generateRandomKeyword(){
    const random = await api.get(`/random_password`)

    return random 
}

export async function loginAccount(data){
    const login = await api.post(`/login`, data)

    return login
}

export async function validateToken(data){
    const validate = await api.post(`/validatoken`, data)

    return validate
}

export async function validaConta(arg){
    const token = arg

    const user = await api.get(`/activation/${token}`)

    return user;
}

export async function getCpfOrEmail(arg){
    let login = arg 
    const user = await api.get(`/getuser/${login}`)

    return user
}

export async function recoverPassword(data){
    let email = data
    const user = await api.post(`/forgot-password`, data)

    return user;
}

export async function resetPassword(token, data){
    let tokenpassword = token
    const user = await api.post(`/reset-password/${tokenpassword}`, data)

    return user;
}

export async function getPerson(){
    const person = await api.get('/person/config')

    return person;
}