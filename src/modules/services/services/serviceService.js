import {api} from "@/api/api"
import axios from "axios"

export const serviceService={
    create:async(data)=>{
        return await axios.post("https://jsonplaceholder.typicode.com/posts",data)
    },
    getAll:async()=>{
        return await axios.get("https://jsonplaceholder.typicode.com/posts")
    },
    update:async(id,data)=>{
        return await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,data)
    },
    delete:async(id)=>{
        return await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    },
    search:async (value,createdAt) => {
    return api.get("/collaborator/search", {
        params: {
            search: value,
            createdAt:createdAt
        }
    })
}

}