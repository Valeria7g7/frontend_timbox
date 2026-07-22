import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/modules/user/interfaces/user.chema";
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react";
import { useState } from "react";
import userService from "@/modules/user/services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const navigate=useNavigate();
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmationPassword,setShowConfirmationPassword]=useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
    })

    const onSubmit = async (data) => {
        try{
       const  response=await userService.create(data)
        localStorage.setItem("user", JSON.stringify(response.data));

         toast.success('¡Cuenta creada exitosamente!', {
                duration: 4000,
                position: 'top-right',
            })
            navigate("/profile")
    }catch(error){
         const errorMessage= error.response && error.response.data.message?error.response.data.message:'Error al realizar el registro'
         toast.error(errorMessage, {
                duration: 4000,
                position: 'top-right',
            })
    }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Crea Tu Cuenta
                    </h1>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">
                        <p className="text-white text-center font-semibold text-lg">Completa tu perfil con los datos personales</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                               
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Nombre <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="Escribe tu nombre"
                                        {...register("name")}
                                        className={`${errors.name ? 'border-red-500' : ''}`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="tu@email.com"
                                        {...register("email")}
                                        className={`${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="rfc" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        RFC <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        maxLength={13}
                                        id="rfc"
                                        placeholder="Ej: ABC123456XYZ"
                                        {...register("rfc")}
                                        className={`${errors.rfc ? 'border-red-500' : ''}`}
                                    />
                                    {errors.rfc && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.rfc.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Contraseña <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex">
                                    <Input
                                        type={showPassword?'text':'password'}
                                        id="password"
                                        placeholder="••••••••"
                                        {...register("password")}
                                        className={`${errors.password ? 'border-red-500' : ''}`}
                                    />
                                    <Eye onClick={()=>{setShowPassword(!showPassword)}}/>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Confirma tu Contraseña <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex">
                                    <Input
                                        type= {showConfirmationPassword?'text':'password'}
                                        id="password_confirmation"
                                        placeholder="••••••••"
                                        {...register("password_confirmation")}
                                        className={`${errors.password_confirmation ? 'border-red-500' : ''}`}
                                    />
                                    <Eye onClick={()=>{setShowConfirmationPassword(!showConfirmationPassword)}} className="w-1/10"/>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.password_confirmation.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-6"
                            >
                                Crear Cuenta
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-600 dark:text-gray-400">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition">
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}