import { useEffect, useState } from "react";
import { LoadingComponent } from "@/components/LoadingComponente";
import { NoData } from "@/components/NoData";
import { collaboratorService } from "../services/collaboratorService";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react"
import toast from "react-hot-toast";
import { Confirmation } from "@/components/Confirmation";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export const CollaboratorList = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [ent, setEntity] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [searchWithDate, setSearchValueWithDate] = useState('')

  useEffect(() => {
    getAll()
  }, [])
  const getAll = async () => {
    setIsLoading(true)
    const response = await collaboratorService.getAll();
    setEntities(response.data);
    setIsLoading(false)
  }

  const deleteEntity = async () => {
    try {
      await collaboratorService.delete(ent.id)
      toast.success('Registro eliminado correctamente', {
        duration: 4000,
        position: 'top-right'
      })
      setEntities(entities.filter(entity => entity.id != ent.id))
      setShowConfirmation(false)

    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Error al eliminar el registro"
      toast.error(errorMessage, {
        duration: 4000,
        position: "top-right"

      })
      setShowConfirmation(falase)
    }
  }
  const search = async () => {
    const response = await collaboratorService.search(searchValue,searchWithDate)
    setEntities(response?.data)
  }
  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
        {isLoading && (
          <LoadingComponent text={"Cargando colaboradores"} />
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Empleados
          </h1>
        </div>
        <div className="w-full flex"><Input  type="date" className="w-9/10" value={searchWithDate} onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} onChange={(e) => { setSearchValueWithDate(e.target.value) }} /></div>

        <div className="w-full flex"><Input className="w-9/10" value={searchValue} onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} onChange={(e) => { setSearchValue(e.target.value) }} placeholder="Buscar por CURP, RFC o Nombre" /><Button className="w-1/10 bg-blue-700" onClick={() => { search() }}><Search></Search>Buscar</Button></div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left border-b">Nombre</th>
                <th className="px-4 py-3 text-left border-b">Correo electronico</th>
                <th className="px-4 py-3 text-left border-b">RFC</th>
                <th className="px-4 py-3 text-left border-b">Domicilio Fiscal</th>
                <th className="px-4 py-3 text-left border-b">Curp</th>
                <th className="px-4 py-3 text-left border-b">NSS</th>
                <th className="px-4 py-3 text-left border-b">Fecha-Inicio-Laboral</th>
                <th className="px-4 py-3 text-left border-b">Tipo de contrato</th>
                <th className="px-4 py-3 text-left border-b">Departamento</th>
                <th className="px-4 py-3 text-left border-b">Puesto</th>
                <th className="px-4 py-3 text-left border-b">Salario diario</th>
                <th className="px-4 py-3 text-left border-b">Salario</th>
                <th className="px-4 py-3 text-left border-b">Clave entidad</th>
                <th className="px-4 py-3 text-left border-b">Estado</th>
                <th className="px-4 py-3 text-left border-b">Acciones</th>

              </tr>
            </thead>
            <tbody className="text-gray-700">
              {entities && entities.map((entity) => (
                <tr key={entity.id}>
                  <td className="px-4 py-3">{entity.name}</td>
                  <td className="px-4 py-3">{entity.email}</td>
                  <td className="px-4 py-3">{entity.rfc}</td>
                  <td className="px-4 py-3">{entity.tax_domicile}</td>
                  <td className="px-4 py-3">{entity.curp}</td>
                  <td className="px-4 py-3">{entity.nss}</td>
                  <td className="px-4 py-3">{entity.employment_start_date}</td>
                  <td className="px-4 py-3">{entity.contract_type}</td>
                  <td className="px-4 py-3">{entity.departament}</td>
                  <td className="px-4 py-3">{entity.position}</td>
                  <td className="px-4 py-3">{entity.dayli_wage}</td>
                  <td className="px-4 py-3">{entity.salary}</td>
                  <td className="px-4 py-3">{entity.entity_code}</td>
                  <td className="px-4 py-3">{entity.state}</td>
                  <td className="px-4 py-3">
                    <div className="flex ">
                      <Button onClick={() => {
                        setEntity(entity)
                        navigate("/collaborators/create", {
                          state: {
                            collaborator: entity
                          }
                        });
                      }
                      }><Pencil /></Button>
                      <Button onClick={() => {
                        setEntity(entity)
                        setShowConfirmation(true)
                      }} ><Trash2 /></Button></div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>


        </div>


        {entities.length == 0 && (
          <div className="border border-border rounded-lg p-6">
            <NoData />
          </div>
        )}
      </div>
      {showConfirmation && (
        <Confirmation message={`¿Realmente deceas eliminar al empleado con rfc: ${ent?.rfc}?`}
          onConfirmation={deleteEntity}
          onCancel={() => { setShowConfirmation(false) }}
        />
      )}
    </div>
  );

}