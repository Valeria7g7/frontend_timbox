

import { api } from "@/api/api";
const userService={
 getAll(){return api.get("/users")},
create(data){return api.post("/users",data)},
 update(data,id){return api.put(`/users/${id}`,data)},
 deleteEntity(id){return api.delete(`/users/${id}`)}
}
export default userService;