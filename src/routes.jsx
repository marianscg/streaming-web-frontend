import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./auth/Login"
import { Services } from "./services/Services"
import { Clients } from "./clients/Clients"
import { Bills } from "./bills/Bills"

export const AppRoutes = () => {

  return (<>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/clients" element={<Clients/>}/>
            <Route path="/bills" element={<Bills/>}/>

            <Route path='/*' element={<Navigate to='/login'/>}/>
        </Routes>
    </>)}
