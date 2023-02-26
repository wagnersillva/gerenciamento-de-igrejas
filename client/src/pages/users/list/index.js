import React, {useEffect, useState} from 'react';
import LayoutContent from "../../../components/LayoutContainer/LayoutContent";
import {listUserRequest, destroyRequest} from "../../../store/modules/users/action";
import {useDispatch, useSelector} from "react-redux";
import {breadcrumbList, configTable} from "../utils";
import {getMessage} from "../../../i18n";
import {useNavigate} from "react-router-dom";
import CustomTable from "../../../components/Table";
import {getPermissions} from "../../../security/auth";

export default function Users(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, total } = useSelector(store => store.userReducer );
    const [listUsers, setListusers] = useState([]);
    const { i18n, columns } = configTable;

    useEffect(() => {
        if(data) setListusers(data)
    }, [data])

    useEffect(() => {
        setListusers([])
        getList();
    }, [])

    function getList(params = {}){
        dispatch(listUserRequest(params))
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
            newRegister={"/secretaria/membros/form"}
            module={"user"}
            title={getMessage("secretaria.membros.listagem.label")}
        >
            <CustomTable
                i18n={i18n}
                data={listUsers}
                total={total}
                actions={actions}
                columns={columns}
                onChangePagination={onChangePagination}
            />
        </LayoutContent>
    )
}