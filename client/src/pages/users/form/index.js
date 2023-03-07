import React, { useEffect } from 'react'
import LayoutContent from "../../../components/Layout/Content";
import {breadcrumbForm} from "../utils";
import {getMessage} from "../../../i18n";
import Content from "./Content";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {prepareEditRequest, prepareSaveRequest, saveRequest, updateRequest} from "../../../store/modules/users/action";
import {getCepInfoRequest, getStatesRequest, getCityListRequest} from "../../../store/modules/Utils/action";
import {onlyNumbers} from "../../../utils/functions";

export default function UsersForm(){
    const dispatch = useDispatch();
    const { id } = useParams();

    const getCepInfo = (field) => {
        const { value } = field.target;
        const CEPNumber = value ? onlyNumbers(value) : null;
        if(CEPNumber?.length === 8) dispatch(getCepInfoRequest(CEPNumber));
    }

    const getCityList = (value) => dispatch(getCityListRequest(value))

    useEffect(() => {
        dispatch(getStatesRequest());
    }, [])

    useEffect(() => {
        if(id){
            dispatch(prepareEditRequest(id))
        } else {
            dispatch(prepareSaveRequest())
        }
    }, [id])

    function saveData(values){
        if(values.id){
            dispatch(updateRequest(values))
        } else {
            dispatch(saveRequest(values))
        }
    }

    return (
        <LayoutContent breadcrumb={breadcrumbForm} title={getMessage(`secretaria.membros.${id ? "editar" : "cadastro"}.label`)}>
            <Content save={saveData} id={id} getCepInfoRequest={getCepInfo} getCityList={getCityList} />
        </LayoutContent>
    )
}