import React from 'react'
import LOCAL_STORAGE_KEYS from '../../constants/localStorage'
import { Navigate, Outlet } from 'react-router-dom'


export const LoginMiddelware = () => {

    //Obtenemos un elemento del local storage
    const auth_token=localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)

    if (!auth_token){
      //Outlet es el componente que va a representar la siguiente ruta dentro del midleware
        return <Outlet/>
    }
    else{
      //Redireccion con formato de componente
        return <Navigate to={'/home'}/>
    }

}
export default LoginMiddelware