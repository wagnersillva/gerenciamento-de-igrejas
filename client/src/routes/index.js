import React, {  Suspense } from "react";
import {Route, Routes} from 'react-router-dom';
import { mappingRoutes } from "./mappingRoutes";
import {PrivateRoute} from "./PrivateRoute";
import LoadingDefault from "../components/LoadingDefault";
import Login from "../pages/auth/login";
import UpdatePassword from "../pages/auth/updatePassword";

const renderRoute = element => <Suspense fallback={<LoadingDefault suspense={true} loading={true} />}>  {element} </Suspense>
const renderRoutes = () => {
    return mappingRoutes.map( (path, index) => {
        const { url, permitAll, element } = path
        return (
            <Route key={index+path} path={url} exact element={ permitAll ? renderRoute(element) : <PrivateRoute key={index+path} element={renderRoute(element)} /> }/>
        )
    })
}

export default function RoutesContainer(){
    return (
        <Routes>
            {renderRoutes()}
            <Route path={"/auth/login"} element={<Login />} />
            <Route path={"/auth/change-password"} element={<UpdatePassword />} />
        </Routes>
    )
}