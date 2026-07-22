import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/modules/user/interfaces/user.chema";
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react";
import userService from "@/modules/user/services/userService";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
    const navigate=useNavigate();
    const [showPassword,setShowPassword]=useState(true)
    const [showConfirmationPassword,setShowConfirmationPassword]=useState(true)
    const [user, setUser] = useState()
     const { register, handleSubmit, formState: { errors },reset } = useForm({
        resolver: zodResolver(userSchema),
    })
    useEffect(() => {
        loadUser()
    }, [])


    const loadUser = async () => {
        await authService.me()
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user)
        reset({
             name: user?.name,
            email: user?.email,
            rfc: user?.rfc
        })
        console.log("user: ",user)
    }
    
   
  const  onSubmit = async (data) => {
    try{
       await userService.update(data,user.id)
       toast.success('Tus datos se actualizaron correctamente',{
        duration:4000,
        position:"top-right"
       })
    }catch(error){
const errorMessage= error.response && error.response.data.message?error.response.data.message:'Error al actualizar tus datos'
         toast.error(errorMessage, {
                duration: 4000,
                position: 'top-right',
            })
    }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto">
                <div className=" mb-8 ">
                    
                    <div className="">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Mi Perfil
                        </h1>
                        <p className=" mt-2 text-center font-bold text-white bg-emerald-600 p-4 text-8x1">Bienvenida, {user?.name}</p>
                    </div>
                  
                </div>
                
                <div className="">  <Button 
                        onClick={() => navigate("/collaborators")}
                        className=""
                    >
                        <ArrowLeft size={20} />
                        Atrás
                    </Button></div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                                    className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                        <span>•</span> {errors.name.message}
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
                                    className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                        <span>•</span> {errors.email.message}
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
                                    className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.rfc ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                />
                                {errors.rfc && (
                                    <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                        <span>•</span> {errors.rfc.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Contraseña <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        placeholder="••••••••"
                                        {...register("password")}
                                        className={`w-full px-4 py-2 pr-10 border rounded-lg transition focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    />
                                    <Eye 
                                        onClick={() => { setShowPassword(!showPassword) }} 
                                        size={18}
                                        className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                        <span>•</span> {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Confirma tu Contraseña <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmationPassword ? 'text' : 'password'}
                                        id="password_confirmation"
                                        placeholder="••••••••"
                                        {...register("password_confirmation")}
                                        className={`w-full px-4 py-2 pr-10 border rounded-lg transition focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.password_confirmation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    />
                                    <Eye 
                                        onClick={() => { setShowConfirmationPassword(!showConfirmationPassword) }} 
                                        size={18}
                                        className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                                    />
                                </div>
                                {errors.password_confirmation && (
                                    <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                        <span>•</span> {errors.password_confirmation.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center pt-6">
                            <Button
                                type="submit"
                                className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                            >
                                Actualizar mis datos
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}