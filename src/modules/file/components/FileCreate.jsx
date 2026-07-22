import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Actions } from "@/interfaces/interface"
import { Textarea } from "@/components/ui/textarea";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fileService } from '../services/fileService';
import toast from 'react-hot-toast';
export const FileCreate = ({ isOpen, onClose, mode = Actions.CREATE, entity, setEntity }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState(null)
    const arrayData={
        file_name:null,
        extension:null
    }
    const onSubmit = async () => {
        if(!file)return toast.error('El archivo es requerido',{duration:4000, position:'top-right'})
        try {
            setIsLoading(true)
            if (mode === Actions.CREATE) {
                arrayData.file_name=file.name
                arrayData.extension=file.type.split('/')[1]
                const response = await fileService.create(arrayData)
                onClose()
                 setEntity(response.data)
 
 

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
                    <DialogTitle> Guardar nuevo archivo</DialogTitle>
                    <DialogDescription>
                        Guardar nuevo archivo
                    </DialogDescription>
                </DialogHeader>

                <div className="p-8">
                    <form  className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                            <div className='w-full'>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Archivo <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="file"
                                    accept='.pdf,xlsx'
                                    onChange={(e) => {
                                        const selectedFile = e.target.files[0];
                                        setFile(selectedFile);
                                    }}
                                    value={file?.name}
                                    className={`${false ? 'border-red-500' : ''}`}
                                />
                                <p>{file?.name}</p>
                                
                            </div>



                        </div>
                        <Button
                            
                            onClick={()=>{onSubmit()}}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-6"
                        >
                            {(!isLoading ? mode == Actions.CREATE ? 'Guarrdar File' : 'Actualizar file' : 'Guardandoo....')}
                        </Button>
                    </form>
                </div>



            </DialogContent>
        </Dialog>
    );
};