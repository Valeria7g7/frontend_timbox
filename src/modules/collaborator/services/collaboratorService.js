import {api} from "@/api/api"
export const collaboratorService={
    create:async(data)=>{
        return await api.post("/collaborator",data)
    },
    getAll:async()=>{
        return await api.get("/collaborator")
    },
    update:async(id,data)=>{
        return await api.put(`/collaborator/${id}`,data)
    },
    delete:async(id)=>{
        return await api.delete(`/collaborator/${id}`)
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