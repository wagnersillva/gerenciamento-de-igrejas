import React, {useEffect} from 'react';
import LayoutContent from "../../../components/LayoutContainer/LayoutContent";
import {listChurchJobRequest, destroyRequest} from "../../../store/modules/churchJobs/action";
import {useDispatch, useSelector} from "react-redux";
import {breadcrumbList, configTable} from "../utils";
import {getMessage} from "../../../i18n";
import {useNavigate} from "react-router-dom";
import CustomTable from "../../../components/Table";

export default function ChurchJobs(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, total } = useSelector(store => store.churchJobReducer );
    const { i18n, columns } = configTable;

    useEffect(() => {
        getList();
    }, [])

    function getList(params = {}){
        dispatch(listChurchJobRequest(params))
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
            newRegister={"/secretaria/cargos/form"}
            module={"church-job"}
            title={getMessage("secretaria.cargos.listagem.label")}
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