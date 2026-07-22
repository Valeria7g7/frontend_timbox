import {z} from "zod"

export const collaboratorSchema=z.object({
    name:z.string().min(4,{message:"El nombre es requerido"}).max(50),
    email:z.string().min(4,{message:"El correo es requerido"}).email({message:"El correo no es valido"}),
    rfc:z.string().refine((value)=>value.length==12 || value.length==13,
    {
        message:"El RFC debe tener minimo 12 y maximo 13 caracteres"
    }),

    tax_domicile:z.string().min(2,{message:"El Domicilio fiscal es requerido"}),
    curp:z.string().min(18,{message:"La curp es requerida"}).max(18,{message:"La curp o debe tener mas de 18 caracteres"}),
    nss:z.string().min(11,{message:"El NSS es requerido"}).max(11,{message:"El NSS no debe tener mas de 11 caracteres"}),
    employment_start_date:z.string().min(6,{message:"La fecha es requerida"}),
    contract_type:z.string().min(2,{message:"El tipo de contrato es requerido"}),
    departament:z.string().min(2,{message:"El departamento es requerido"}),
    position:z.string().min(2,{message:"El puesto es requerido"}),
    dayli_wage:z.string().min(2,{message:"El salario diario es requerido"}),//salaroo diario
    salary:z.string().min(2,{message:"El salario es requerido"}),
    entity_code:z.string().min(2,{message:"El codigo de entidad es requerido"}),//clave de entidad
    state:z.string().min(3,{message:"El estado es requerido"}),



})


export const states = [
  { clave: "01", nombre: "Aguascalientes" },
  { clave: "02", nombre: "Baja California" },
  { clave: "03", nombre: "Baja California Sur" },
  { clave: "04", nombre: "Campeche" },
  { clave: "05", nombre: "Coahuila" },
  { clave: "06", nombre: "Colima" },
  { clave: "07", nombre: "Chiapas" },
  { clave: "08", nombre: "Chihuahua" },
  { clave: "09", nombre: "Ciudad de México" },
  { clave: "10", nombre: "Durango" },
  { clave: "11", nombre: "Guanajuato" },
  { clave: "12", nombre: "Guerrero" },
  { clave: "13", nombre: "Hidalgo" },
  { clave: "14", nombre: "Jalisco" },
  { clave: "15", nombre: "Estado de México" },
  { clave: "16", nombre: "Michoacán" },
  { clave: "17", nombre: "Morelos" },
  { clave: "18", nombre: "Nayarit" },
  { clave: "19", nombre: "Nuevo León" },
  { clave: "20", nombre: "Oaxaca" },
  { clave: "21", nombre: "Puebla" },
  { clave: "22", nombre: "Querétaro" },
  { clave: "23", nombre: "Quintana Roo" },
  { clave: "24", nombre: "San Luis Potosí" },
  { clave: "25", nombre: "Sinaloa" },
  { clave: "26", nombre: "Sonora" },
  { clave: "27", nombre: "Tabasco" },
  { clave: "28", nombre: "Tamaulipas" },
  { clave: "29", nombre: "Tlaxcala" },
  { clave: "30", nombre: "Veracruz" },
  { clave: "31", nombre: "Yucatán" },
  { clave: "32", nombre: "Zacatecas" }
];
/*  Nombre
■ Correo
■ RFC
■ Domicilio Fiscal
■ CURP
■ Número de Seguridad Social
■ Fecha Inicio Laboral
■ Tipo de Contrato
■ Departamento
■ Puesto
■ Salario Diario
■ Salario
■ Clave Entidad
■ Estado (deberá de ser un despliegue de los estados de México) */