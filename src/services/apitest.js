import axios from "axios"

const tkUser = localStorage.getItem('tk-user')

console.log("tk teste", tkUser);

export default axios.create({
    baseURL: "https://api.dkawasaka.com/api/v1",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${(JSON.parse(tkUser))}`
    }
})