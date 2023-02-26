import React from "react";
import {getMessage} from "../../i18n";

export const breadcrumbList = [
    { label: getMessage("secretaria.label") },
    { path: "/secretaria/igrejas", label: getMessage("secretaria.churches.label") }
]

export const breadcrumbForm = [
    ...breadcrumbList,
    { label: getMessage("secretaria.form.label") },
]

export const configTable = {
    i18n: "table.churches.",
    columns: [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'matriz',
            dataIndex: 'matriz',
            key: 'matriz',
            render: (_, church) => `${church.name} - ${church.is_matriz ? 'Sede' : 'Filial'}`,
        }
    ]
}