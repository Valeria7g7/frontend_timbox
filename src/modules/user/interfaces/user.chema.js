import {z} from "zod"

export const userSchema=z.object({
    name:z.string().min(4,{message:"El nombre es requerido"}).max(50),
    email:z.string().min(4,{message:"El correo es requerido"}).email({message:"El correo no es valido"}),
    rfc:z.string().refine((value)=>value.length==12 || value.length==13,
    {
        message:"El RFC debe tener minimo 12 y maximo 13 caracteres"
    }),
    password:z.string().min(8,{message:"La contraseña debe tener minimo 8 caracteres"}),
    password_confirmation:z.string().min(8,{message:"La contraseña debe tener minimo 8 caracteres"}),
})
.refine((data)=>data.password==data.password_confirmation,{
    message:"Las contraseña y su confirmación no coinciden",
    path:["password_confirmation"],
})

//para la actualizacion de datos del user usamos este schema
export const userUpdateSchema=z.object({
    name:z.string().min(4,{message:"El nombre es requerido"}).max(50),
    email:z.string().min(4,{message:"El correo es requerido"}).email({message:"El correo no es valido"}),
    rfc:z.string().refine((value)=>value.length==12 || value.length==13,
    {
        message:"El RFC debe tener minimo 12 y maximo 13 caracteres"
    }),
})

