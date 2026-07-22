import { Outlet } from "react-router-dom";
import { Menu } from "../components/Menu";

export const MainLayout=()=>{
    return(
        <div className="min-h-screen flex flex-col md:flex-row">
            <Menu/>
            <div className="flex-1 p-5">
                <Outlet/>
            </div>
        </div>
    );
}