import {api} from "@/api/api"
import axios from "axios"
export const fileService={
    create:async(formData)=>{
       return  await api.post("/file", formData, { headers: {   "Content-Type": "multipart/form-data"}})
  
       // return await api.post("/file",data)
    },
    getAll:async()=>{
        return await api.get("/file")
    },
    update:async(id,data)=>{
        return await api.put(`/file/${id}`,data)
    },
    delete:async(id)=>{
        return await api.delete(`/file/${id}`)
    },
    search:async (value,createdAt) => {
    return api.get("/file/search", {
        params: {
            search: value,
            createdAt:createdAt
        }
    })
}

}