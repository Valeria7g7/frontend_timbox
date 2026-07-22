import { useEffect, useState } from "react";
import userService from "../services/userService";
import { LoadingComponent } from "@/components/LoadingComponente";
import { NoData } from "@/components/NoData";
export const UsersList=()=>{
    const [entities,setEntities]=useState([]);
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        getAll()
    },[])
    const getAll =async()=>{
        setIsLoading(true)
        const response=await userService.getAll();
        setEntities(response.data);
        setIsLoading(false)
    }
    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
            {isLoading&&(
                <LoadingComponent text={"Cargando usuarios"}/>
            )}
            
              <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Usuarios
                    </h1>
                </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-3 text-left border-b">Nombre</th>
                        <th className="px-4 py-3 text-left border-b">Correo electronico</th>
                        <th className="px-4 py-3 text-left border-b">RFC</th>


                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {entities && entities.map((entity)=>(
                        <tr>
                            <td className="px-4 py-3">{entity.name}</td>
                            <td className="px-4 py-3">{entity.email}</td>

                            <td className="px-4 py-3">{entity.rfc}</td>

                        </tr>
                    ))}
                </tbody>
                </table>


            </div>

            {entities.length==0&&(
                <div className="border border-border rounded-lg p-6">
                        <NoData />
                    </div>
            )}
        </div>
        </div>
    );

}