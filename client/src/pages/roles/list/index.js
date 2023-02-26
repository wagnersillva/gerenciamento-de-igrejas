import React, {useEffect} from 'react';
import LayoutContent from "../../../components/LayoutContainer/LayoutContent";
import {listRoleRequest, destroyRequest} from "../../../store/modules/roles/action";
import {useDispatch, useSelector} from "react-redux";
import {breadcrumbList, configTable} from "../utils";
import {getMessage} from "../../../i18n";
import {useNavigate} from "react-router-dom";
import CustomTable from "../../../components/Table";

export default function Roles(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, total } = useSelector(store => store.roleReducer );
    const { i18n, columns } = configTable;

    useEffect(() => {
        getList();
    }, [])

    function getList(params = {}){
        dispatch(listRoleRequest(params))
    }

    const actions = {
        destroy: (object) => dispatch(destroyRequest(object?.id)),
        edit: (object) => navigate(`form/${object.id}`)
    }

    const onChangePagination = (page) => {
        getList({ page })
    }

     console.log({ data })

    return (
        <LayoutContent
            breadcrumb={breadcrumbList}
            newRegister={"/seguranca/perfil/form"}
            module={"role"}
            title={getMessage("seguranca.perfil.listagem.label")}
        >
            <CustomTable
                i18n={i18n}
                data={data}
                total={total}
                actions={actions}
                columns={columns}
                onChangePagination={onChangePagination}
            />
        </LayoutContent>
    )
}