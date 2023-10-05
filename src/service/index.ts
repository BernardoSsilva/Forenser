import axios from "axios";

export function apiDefault(){
    const api= axios.create({
        baseURL:'http://localhost:3001'
    })

    return api
}

export const api = apiDefault()