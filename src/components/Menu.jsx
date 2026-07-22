import { Link } from "react-router-dom";
import { Power, User2, Menu as MenuIcon, X } from "lucide-react"
import { useState } from "react";
const logout = () => {
    console.log("Aqui tendria que implementar las acciones cuando damos en salir pero ahora solo simulamos")
}
export const Menu = () => {
    const [showMenu, setShowMenu] = useState(true)
    return (
        <aside className={`
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
            <nav className={`flex flex-col gap-3 mt-2  flex-1 ${showMenu ? "bg-red-900" : ""}`}>
                <div className="flex items-center justify-between">
                    {showMenu && (
                            <h2 className="text-2xl">
                                Menú
                            </h2>
                        )
                    }

                    <button   onClick={() => setShowMenu(!showMenu)} >
                        {showMenu
                                ? <X size={24} />
                                : <MenuIcon className="text-black" size={24} />
                        }
                    </button>

                </div>
                {showMenu && (
                    <>
                        <Link className="mt-5 text-purple-600 px-3 py-2   text-2x1 text-lg font-bold  " to="/profile"><div className="flex"><p className="me-2 ">Mi perfil</p><User2 /></div></Link>
                        <Link to="/users" className="px-3 py-2 rounded-4xl mt-7  hover:bg-red-800 transition text-black text-lg font-bold">Usuarios</Link>
                        <Link to="/files" className="px-3 py-2 rounded-4xlmt-7  hover:bg-red-800 transition text-black text-lg font-bold">Carga de archivos</Link>
                        <Link to="/collaborators/create" className="px-3 py-2 rounded-4xl mt-7  hover:bg-red-800 transition text-black text-lg font-bold">Colaborador</Link>
                        <Link to="/collaborators" className="px-3 py-2 rounded-4xl mt-7  hover:bg-red-800 transition text-black text-lg font-bold">Empleados</Link>
                        <Link to="/services" className="px-3 py-2 rounded-4xl mt-7  hover:bg-red-800 transition text-black text-lg font-bold">Servicios</Link>
                        <Link to="/" onClick={logout} className="mt-60 px-3 py-2 rounded-4xl   hover:bg-red-500 transition text-black text-lg font-bold"><div className="flex"><p className="text-red-300">Cerrar Sesión</p><Power className="ml-2" /></div></Link>
                    </>
                )}


            </nav>


        </aside>)
}