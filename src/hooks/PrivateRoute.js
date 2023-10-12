import useAuth from "./useAuth"
import Login from '../pages/Login';
import { Outlet } from "react-router-dom";
export function PrivateRoute() {
    const {token} = useAuth()
    return token?<Outlet/>:<Login/>
}
export function PrivateElement({children,...rest}){
    const {token} = useAuth()
    return token?children:<></>

}