import {api} from "@/api/api"
export const authService={
    login:async(data)=>{
       const response= await api.post("/auth/login",data)
       console.log("response ",response.data)
       localStorage.setItem("user", JSON.stringify(response.data));

        return response;
    },
    me(){
        const user = JSON.parse(localStorage.getItem("user"));
        return api.get(`/auth/me/${user.id}`)
    }
}