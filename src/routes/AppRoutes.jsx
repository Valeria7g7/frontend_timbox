import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CollaboratorList } from "../modules/collaborator/pages/CollaboratorList";
import { MainLayout } from "../Layouts/MainLayout";
import { Login } from "../modules/auth/pages/Login";
import { Register } from "@/modules/auth/pages/Register";
import { Profile } from "@/modules/auth/pages/Profile";
import { UsersList } from "@/modules/user/pages/UsersList";
import { CollaboratorCreate } from "@/modules/collaborator/pages/CollaboratosCreate";
import { ServiceList } from "@/modules/services/pages/ServiceList";
import { FileList } from "@/modules/file/pages/FileList";
import { RecoverPassword } from "@/modules/auth/pages/RecoverPassword";
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/recover" element={<RecoverPassword />} />

                <Route element={<MainLayout />}>
                    <Route path="/users" element={<UsersList />} />
                    <Route path="/collaborators" element={<CollaboratorList />} />
                    <Route path="/collaborators/create/:id?" element={<CollaboratorCreate />} />
                    <Route path="/services" element={<ServiceList />} />
                    <Route path="/files" element={<FileList />} />

                </Route>


            </Routes>

        </BrowserRouter>
    );

}