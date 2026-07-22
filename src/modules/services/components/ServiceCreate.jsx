import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Actions } from "@/interfaces/interface"
import { Textarea } from "@/components/ui/textarea";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from '../interfaces/service.schema';
import { serviceService } from '../services/serviceService';
import toast from 'react-hot-toast';
export const ServiceCreate = ({ isOpen, onClose, mode = Actions.CREATE, entity, setEntity }) => {
      const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(serviceSchema)
    });
    useEffect(() => {
        if (mode == Actions.UPDATE && entity) {
            reset({
                title: entity.title,
                body: entity.body,
            })
        }
    }, [entity, mode, reset])
    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            if (mode === Actions.CREATE) {
                const response = await serviceService.create(data)

                setEntity(response.data)
                onClose()


            }
            if (mode === Actions.UPDATE && entity) {
                const response = await serviceService.update(entity.id, data)
                setEntity(response.data)
                onClose()


            }
        setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            toast.error('¡Error !' + error, {
                duration: 4000,
                position: 'top-right',
            })

        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle> {mode === Actions.CREATE ? 'Crear Nueva Publicacion' : 'Editar Publicacion'}</DialogTitle>
                    <DialogDescription>
                        Completa el formulario para guardar una nueva publicacion
                    </DialogDescription>
                </DialogHeader>

                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Titulo <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Escribe el titulo"
                                    {...register("title")}
                                    className={`${errors.title ? 'border-red-500' : ''}`}
                                />
                                {errors.title && (
                                    <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="body" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    body <span className="text-red-500">*</span>
                                </label>

                                <Textarea
                                    id="body"
                                    placeholder="Escribe la descripción"
                                    rows={5}
                                    {...register("body")}
                                    className={errors.body ? "border-red-500" : ""}
                                />
                                {errors.body && (
                                    <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                        {errors.body.message}
                                    </p>
                                )}
                            </div>

                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-6"
                        >
                            {(!isLoading?mode == Actions.CREATE ? 'Crear Publicacion' : 'Actualizar publicacion':'Guardandoo....')}
                        </Button>
                    </form>
                </div>



            </DialogContent>
        </Dialog>
    );
};