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
import { Actions } from "@/interfaces/interface";
import { fileService } from "../services/fileService";
import { FileCreate } from "../components/FileCreate";
export const FileList = () => {
  const navigate = useNavigate();
   const [openModal, setOpenModal]=useState(false)
   const [mode,setMode]=useState(Actions.CREATE)
  
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [ent, setEntity] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [searchWithDate, setSearchValueWithDate] = useState('')

  useEffect(() => {
    getAll()
  }, [])
   

 useEffect(()=>{
replace()

 },[ent])
  const replace=async()=>{
if(mode===Actions.UPDATE){
setEntities(previous =>
    previous.map(currentEntity =>
        currentEntity.id === ent.id
            ? ent
            : currentEntity
    ))
  }
  if(mode===Actions.CREATE){
setEntities(previus=>[ent,...previus])
  }


  }
  const getAll = async () => {
    setIsLoading(true)
    const response = await fileService.getAll();
    setEntities(response.data);
    setIsLoading(false)
  }

  const deleteEntity = async () => {
    try {
      await fileService.delete(ent.id)
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
          <LoadingComponent text={"Cargando files"} />
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Archivos
          </h1>
        </div>

       <div className="flex justify-end"><Button  className="bg-purple-500" onClick={()=>{setOpenModal(true)}}>+ Nuevo registro</Button> </div>
        <div className="w-full flex justify-end"><Button className="w-1/10" onClick={() => { getAll() }}><Search></Search></Button></div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left border-b">Nombre-Archivo</th>
                <th className="px-4 py-3 text-left border-b">Extension</th>
                <th className="px-4 py-3 text-left border-b">Fecha-Creacion</th>
                <th className="px-4 py-3 text-left border-b">Acciones</th>

              </tr>
            </thead>
            <tbody className="text-gray-700">
              {entities && entities.map((entity) => (
                <tr key={entity?.id}>
                  <td className="px-4 py-3">{entity?.file_name}</td>
                  <td className="px-4 py-3">{entity?.extension}</td>
                <td className="px-4 py-3">{entity?.createdAt}</td>

                  <td className="px-4 py-3">
                    <div className="flex ">
                      {/* <Button onClick={() => {
                        setEntity(entity)
                        setOpenModal(true)
                        setMode(Actions.UPDATE)
                       
                      }
                      }><Pencil /></Button> */}
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

       {openModal&&(
       < FileCreate isOpen={openModal}  onClose={()=>{setOpenModal(false)}} mode={mode} entity={ent} setEntity={setEntity}/>
       )}

        {entities.length == 0 && (
          <div className="border border-border rounded-lg p-6">
            <NoData />
          </div>
        )}
      </div>
      {showConfirmation && (
        <Confirmation message={`¿Realmente deceas eliminar el registro de este archivo con id: ${ent?.id}?`}
          onConfirmation={deleteEntity}
          onCancel={() => { setShowConfirmation(false) }}
        />
      )}
    </div>
  );

}