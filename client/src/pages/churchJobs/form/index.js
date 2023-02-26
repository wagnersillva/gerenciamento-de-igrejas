import React, { useEffect } from 'react'
import LayoutContent from "../../../components/LayoutContainer/LayoutContent";
import {breadcrumbForm} from "../utils";
import {getMessage} from "../../../i18n";
import Content from "./Content";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {prepareEditRequest, saveRequest, updateRequest} from "../../../store/modules/churchJobs/action";

export default function ChurchJobsForm(){
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if(id){
            dispatch(prepareEditRequest(id))
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
        <LayoutContent breadcrumb={breadcrumbForm} title={getMessage(`secretaria.cargos.${id ? "editar" : "cadastro"}.label`)}>
            <Content save={saveData} id={id} />
        </LayoutContent>
    )
}