import React from "react";
import {getMessage} from "../../i18n";

export const breadcrumbList = [
    { label: getMessage("secretaria.label") },
    { path: "/secretaria/cargos", label: getMessage("secretaria.cargos.label") }
]

export const breadcrumbForm = [
    ...breadcrumbList,
    { label: getMessage("secretaria.form.label") },
]

export const configTable = {
    i18n: "table.cargos.",
    columns: [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        }
    ]
}