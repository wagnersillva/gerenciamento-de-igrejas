import React from "react";
import {getMessage} from "../../i18n";

export const breadcrumbList = [
    { label: getMessage("secretary.label") },
    { path: "/secretary/secretaries", label: getMessage("secretary.secretaries.label") }
]

export const breadcrumbForm = [
    ...breadcrumbList,
    { label: getMessage("secretary.form.label") },
]

export const configTable = {
    i18n: "table.secretaries.",
    columns: [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'admission',
            dataIndex: 'admission',
            key: 'admission',
        }
    ]
}