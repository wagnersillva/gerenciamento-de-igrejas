import React from "react";
import {getMessage} from "../../i18n";
import TruncateEllipsisPopoverList from "../../components/TruncateEllipsisPopoverList";

export const breadcrumbList = [
    { label: getMessage("seguranca.label") },
    { path: "/seguranca/perfil", label: getMessage("seguranca.perfil.label") }
]

export const breadcrumbForm = [
    ...breadcrumbList,
    { label: getMessage("seguranca.form.label") },
]

export const configTable = {
    i18n: "table.perfil.",
    columns: [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'permissions',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (values, role) =>  renderPermissions(role)
        }
    ]
}

function renderPermissions(role){
    const { is_admin, is_secretary, permissions } = role
    const message = {
        admin: "Permissão total no sistema",
        secretary: "Todos os Cadastros relacionados a secretaria",
    }

    if(is_admin) return message.admin;
    if(is_secretary) return message.secretary;

    return <TruncateEllipsisPopoverList list={permissions.map( value => getMessage(`permissions.${value.name}.label`))} min={50} title={"Permissões"} />
}