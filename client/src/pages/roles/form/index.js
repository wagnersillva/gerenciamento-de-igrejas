import React, { useEffect } from 'react'
import LayoutContent from "../../../components/LayoutContainer/LayoutContent";
import {breadcrumbForm} from "../utils";
import {getMessage} from "../../../i18n";
import Content from "./Content";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {prepareEditRequest, prepareSaveRequest, saveRequest, updateRequest} from "../../../store/modules/roles/action";

export default function RolesForm(){
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if(id){
            dispatch(prepareEditRequest(id))
        } else {
            dispatch(prepareSaveRequest())
        }
    }, [id, dispatch])

    function saveData(values){
        if(values.id){
            dispatch(updateRequest(values))
        } else {
            console.log({ values })
            dispatch(saveRequest(values))
        }
    }

    return (
        <LayoutContent breadcrumb={breadcrumbForm} title={getMessage(`seguranca.perfil.${id ? "editar" : "cadastro"}.label`)}>
            <Content save={saveData} id={id} />
        </LayoutContent>
    )
}