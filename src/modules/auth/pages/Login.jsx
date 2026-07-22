import React,{useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { Eye } from "lucide-react";
import { authService } from "../services/authService";
import { authSchema } from "../interface/auth.chema";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
export const Login = ()=>{
   const navigate=useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(authSchema),
    })
    const onSubmit = async(data) => {
        setError('');
        setLoading(true);
        try {
             await authService.login(data);
             navigate("/profile")
        } catch(err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    }
    return(
         <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Ingresa tu email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Ingresa tu contraseña"
                                    {...register("password")}
                                />
                                <Eye 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    size={20}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        {error && (
                            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                                {error}
                            </div>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                        <div className="flex flex-col gap-2">
                          <a href="/register" className="text-blue-600 font-semibold hover:text-blue-800 transition">
                            ¿No tienes cuenta? Regístrate aquí
                        </a>
                        <a href="/recover" className="ms-2 text-red-600 font-semibold hover:text-red-800 transition">
                            Olvide mi contraseñaaass
                        </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>);
}