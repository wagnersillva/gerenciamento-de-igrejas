import React, {useEffect, useState} from 'react';
import LayoutContent from "../../../components/Layout/Content";
import {listChurchesRequest, destroyRequest} from "../../../store/modules/churches/action";
import {useDispatch, useSelector} from "react-redux";
import {breadcrumbList, configTable} from "../utils";
import {getMessage} from "../../../i18n";
import {useNavigate} from "react-router-dom";
import CustomTable from "../../../components/Table";

export default function Churches(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, total } = useSelector(store => store.churchReducer );
    const [ list, setList ] = useState([]);
    const { i18n, columns } = configTable;

    useEffect(() => {
        if(data) setList(data)
    }, [data])

    useEffect(() => {
        setList([])
        getList();
    }, [])

    function getList(params = {}){
        dispatch(listChurchesRequest(params))
    }

    const actions = {
        destroy: (object) => dispatch(destroyRequest(object?.id)),
        edit: (object) => navigate(`form/${object.id}`)
    }

    const onChangePagination = (page) => {
        getList({ page })
    }

    return (
        <LayoutContent
            breadcrumb={breadcrumbList}
            newRegister={"/secretaria/igrejas/form"}
            module={"church"}
            title={getMessage("secretaria.churches.listagem.label")}
        >
            <CustomTable
                i18n={i18n}
                data={list}
                total={total}
                actions={actions}
                columns={columns}
                onChangePagination={onChangePagination}
            />
        </LayoutContent>
    )
}