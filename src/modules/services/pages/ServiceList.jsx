import { useEffect, useState } from "react";
import { LoadingComponent } from "@/components/LoadingComponente";
import { NoData } from "@/components/NoData";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react"
import toast from "react-hot-toast";
import { Confirmation } from "@/components/Confirmation";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { serviceService } from "../services/serviceService";
import { ServiceCreate } from "../components/ServiceCreate";
import { Actions } from "@/interfaces/interface";
export const ServiceList = () => {
  const [openModal, setOpenModal] = useState(false)
  const [mode, setMode] = useState(Actions.CREATE)

  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [ent, setEntity] = useState()

  useEffect(() => {
    getAll()
  }, [])


  useEffect(() => {
    replace()

  }, [ent])
  const replace = async () => {
    if (mode === Actions.UPDATE) {
      setEntities(previous =>
        previous.map(currentEntity =>
          currentEntity.id === ent.id
            ? ent
            : currentEntity
        ))
    }
    if (mode === Actions.CREATE) {
      setEntities(previus => [ent, ...previus])
    }


  }
  const getAll = async () => {
    setIsLoading(true)
    const response = await serviceService.getAll();
    setEntities(response.data);
    setIsLoading(false)
  }

  const deleteEntity = async () => {
    try {
      await serviceService.delete(ent.id)
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

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
        {isLoading && (
          <LoadingComponent text={"Cargando publicaciones"} />
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Publicaciones
          </h1>
        </div>

        <div className="flex justify-end"><Button className="bg-purple-500" onClick={() => { setOpenModal(true) ,setMode(Actions.CREATE)}}>+ Nueva Publicación</Button> </div>
        <div className="w-full flex justify-end"><Button className="w-1/10 bg-blue-700" onClick={() => { getAll() }}><Search></Search>Buscar</Button></div>
       <div className="overflow-x-auto max-h-[70vh] overflow-y-auto border rounded-lg">
          <table className="min-w-full">
            <thead className="sticky top-0 z-10 bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left border-b">Titulo</th>
                <th className="px-4 py-3 text-left border-b">Descripcion</th>

                <th className="px-4 py-3 text-left border-b">Acciones</th>

              </tr>
            </thead>
            <tbody className="text-gray-700">
              {entities && entities.map((entity) => (
                <tr key={entity?.id}>
                  <td className="px-4 py-3">{entity?.title}</td>
                  <td className="px-4 py-3">{entity?.body}</td>

                  <td className="px-4 py-3">
                    <div className="flex ">
                      <Button
                      className=' w-12 h-12 group bg-white hover:bg-white shadow-none ' 
                       onClick={() => {
                        setEntity(entity)
                        setOpenModal(true)
                        setMode(Actions.UPDATE)

                      }
                      }><Pencil className="w-6 h-6 text-yellow-400 transition-colors group-hover:text-yellow-700"/></Button>
                      <Button className="group bg-white hover:bg-white shadow-none  w-12 h-12" onClick={() => {
                        setEntity(entity)
                        setShowConfirmation(true)
                      }} ><Trash2 className="text-red-500 w-6 h-6 transition-colors group-hover:text-red-800" /></Button></div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>


        </div>

        {openModal && (
          < ServiceCreate isOpen={openModal} onClose={() => { setOpenModal(false) }} mode={mode} entity={ent} setEntity={setEntity} />
        )}

        {entities.length == 0 && (
          <div className="border border-border rounded-lg p-6">
            <NoData />
          </div>
        )}
      </div>
      {showConfirmation && (
        <Confirmation message={`¿Realmente deceas eliminar la publicacion con id: ${ent?.id}?`}
          onConfirmation={deleteEntity}
          onCancel={() => { setShowConfirmation(false) }}
        />
      )}
    </div>
  );

}