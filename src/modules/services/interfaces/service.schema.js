import {z} from "zod"

export const serviceSchema=z.object({
    title:z.string().min(1,{message:"El titulo es requerido"}),
    body:z.string().min(1,{message:"La descripcion es requerida"}),
   
})
