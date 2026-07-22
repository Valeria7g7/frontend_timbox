import {z} from "zod"

export const authSchema=z.object({
    email:z.string().email({message:"El correo no es valido"}),
    password:z.string()
})
