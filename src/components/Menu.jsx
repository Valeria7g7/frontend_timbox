import { Link } from "react-router-dom";
import {Power,User2,Menu as MenuIcon,X} from "lucide-react"
import { useState } from "react";
const logout=()=>{
console.log("logout")
}
export const Menu=()=>{
    const [showMenu, setShowMenu]=useState(true)
    return(
    <aside
    className={`
     ${showMenu ? "w-64" : "w-16"}
    h-auto
    md:h-screen
    ${showMenu ? "bg-red-900" : ""}
   
    text-white
    p-6
    font-bold
    font-mono
    flex
    flex-col` }
    >
        <nav className={`flex flex-col gap-3 mt-12 flex-1 ${showMenu ? "bg-red-900" : ""}`}>
             <div className="flex items-center justify-between">

                    {
                        showMenu && (
                            <h2>
                                Menú
                            </h2>
                        )
                    }

                    <button
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        {
                            showMenu
                            ? <X size={24}/>
                            : <MenuIcon className="text-black" size={24}/>
                        }
                    </button>

                </div>
       {showMenu&&(
        <>
        <Link className="text-blue-600 text-2x1 " to="/profile"><div className="flex"><p className="me-2 ">Mi perfil</p><User2/></div></Link>
        <Link to="/users" className="px-3 py-2 rounded mt-7  hover:bg-pink-600 transition text-black text-lg font-bold">Usuarios</Link>
        <Link to="/files" className="px-3 py-2 rounded mt-7  hover:bg-pink-600 transition text-black text-lg font-bold">Carga de archivos</Link>
        <Link to="/collaborators/create" className="px-3 py-2 rounded mt-7  hover:bg-pink-600 transition text-black text-lg font-bold">Colaborador</Link>
        <Link to="/collaborators" className="px-3 py-2 rounded mt-7  hover:bg-pink-600 transition text-black text-lg font-bold">Empleados</Link>
        <Link to="/services" className="px-3 py-2 rounded mt-7  hover:bg-pink-600 transition text-black text-lg font-bold">Servicios</Link>

        <Link to="/" onClick={logout} className="px-3 py-2 rounded mt-7  hover:bg-pink-600 transition text-black text-lg font-bold"><div className="flex">Cerrar Sesión<Power className="ml-2"/></div></Link>
</>
)}


        </nav>


    </aside>)
}