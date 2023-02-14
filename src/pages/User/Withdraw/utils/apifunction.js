import api from '../../../../services/api';

export default async function withdraw(data){
    const money = await api.post('/withdrawal', data)

    return money;
}