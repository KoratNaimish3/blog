import axios from 'axios'
export const baseUrl='https://blog-backend-knoy.onrender.com'

const instance = axios.create({
    BashURL : baseUrl,
    withCredentials:true
})

export const get =(url,params)=>instance.get(url,params)
export const post =(url,data)=> instance.post(url,data)
export const patch =(url,data)=>instance.patch(url,data)
export const del =(url)=>  instance.delete(url)

