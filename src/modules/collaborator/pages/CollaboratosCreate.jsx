import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/modules/user/interfaces/user.chema";
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react";
import { act, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { collaboratorSchema, states } from "../interfaces/collaborator.schema";
import { collaboratorService } from "../services/collaboratorService";
import { useParams, useLocation } from "react-router-dom";
import { Actions } from "@/interfaces/interface";
export const CollaboratorCreate = () => {
    const [action, setAction] = useState(Actions.CREATE)
    const [loading,setIsLoading]=useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(collaboratorSchema),
    })
    const location = useLocation();

    const collaborator = location.state?.collaborator;
    useEffect(() => {
        if (collaborator) {
            setAction(Actions.UPDATE)
            reset({
                name: collaborator?.name,
                email: collaborator?.email,
                rfc: collaborator?.rfc,
                tax_domicile: collaborator?.tax_domicile,
                curp: collaborator?.curp,
                nss: collaborator?.nss,
                employment_start_date: collaborator?.employment_start_date,
                contract_type: collaborator?.contract_type,
                departament: collaborator?.departament,
                position: collaborator?.position,
                dayli_wage: String(collaborator?.dayli_wage),
                salary: String(collaborator?.salary),
                entity_code: String(collaborator?.entity_code),
                state: collaborator?.state,

            })
        }
    }, [])
    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            if (action == Actions.CREATE) {
                await collaboratorService.create(data)
                toast.success('¡Colaborador creado exitosamente!', {
                    duration: 4000,
                    position: 'top-right',
                })
            }
            if (action == Actions.UPDATE) {
                await collaboratorService.update(collaborator?.id, data)
                toast.success('¡Colaborador actualizado exitosamente!', {
                    duration: 4000,
                    position: 'top-right',
                })
            }
            navigate("/collaborators")
        } catch (error) {
            const errorMessage = error.response && error.response.data.message ? error.response.data.message : 'Error al realizar el registro'
            toast.error(errorMessage, {
                duration: 4000,
                position: 'top-right',
            })
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-1">
            <div className="w-full max-w-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">
                        <p className="text-white text-center font-semibold text-lg">{action==Actions.CREATE?'Completa el siguiente formulario':'Modifica los datos.'}</p>
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
                                    <label htmlFor="tax_domicile" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Domicilio fiscal <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        maxLength={18}
                                        id="tax_domicile"

                                        {...register("tax_domicile")}
                                        className={`${errors.tax_domicile ? 'border-red-500' : ''}`}
                                    />
                                    {errors.tax_domicile && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.tax_domicile.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="curp" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Curp <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        maxLength={18}
                                        id="curp"

                                        {...register("curp")}
                                        className={`${errors.curp ? 'border-red-500' : ''}`}
                                    />
                                    {errors.curp && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.curp.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="nss" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Numero de seguro social <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        maxLength={11}
                                        id="nss"

                                        {...register("nss")}
                                        className={`${errors.nss ? 'border-red-500' : ''}`}
                                    />
                                    {errors.nss && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.nss.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="employment_start_date" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Fecha Inicio Laboral <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="date"
                                        id="employment_start_date"
                                        {...register("employment_start_date")}
                                        className={`${errors.employment_start_date ? 'border-red-500' : ''}`}
                                    />
                                    {errors.employment_start_date && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.employment_start_date.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="contract_type" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Tipo de contrato <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        id="contract_type"
                                        {...register("contract_type")}
                                        className={`${errors.contract_type ? 'border-red-500' : ''}`}
                                    />
                                    {errors.contract_type && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.contract_type.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="departament" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Departamento <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        id="departament"

                                        {...register("departament")}
                                        className={`${errors.departament ? 'border-red-500' : ''}`}
                                    />
                                    {errors.departament && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.departament.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="position" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Puesto <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        id="position"

                                        {...register("position")}
                                        className={`${errors.position ? 'border-red-500' : ''}`}
                                    />
                                    {errors.position && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.position.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="dayli_wage" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Salario diario <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="number"

                                        id="dayli_wage"

                                        {...register("dayli_wage",{valueAsNumber:true})}
                                        className={`${errors.dayli_wage ? 'border-red-500' : ''}`}
                                    />
                                    {errors.dayli_wage && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.dayli_wage.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Salario <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="number"
                                        maxLength={13}
                                        id="salary"

                                        {...register("salary",{valueAsNumber:true})}
                                        className={`${errors.salary ? 'border-red-500' : ''}`}
                                    />
                                    {errors.salary && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.salary.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="entity_code" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        CLave de Estado <span className="text-red-500">*</span>
                                    </label>
                                    <select  {...register("entity_code")}>
                                        <option value="">Seleccione una clave de estado</option>

                                        {states.map((state) => (
                                            <option className="text-black-500" key={state.clave} value={state.clave}>
                                                {state.clave}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.entity_code && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.entity_code.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="state" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Estado <span className="text-red-500">*</span>
                                    </label>
                                    <select  {...register("state")}>
                                        <option value="">Seleccione un estado</option>

                                        {states.map((state) => (
                                            <option className="text-black-500" key={state.nombre} value={state.nombre}>
                                                {state.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state && (
                                        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                                            {errors.state.message}
                                        </p>
                                    )}
                                </div>


                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-6"
                            >
                                {!loading?(action == 'CREATE' ? 'Registrar colaborador' : 'Actualizar colaborador'):'Guardando'}
                            </Button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
}